// import { Admin } from "../model/adminSchema.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // JWT import
// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../database/cloudinary.js";

// // Register Admin
// const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(401).json({
//         message: "Please check the inputs",
//         success: false,
//       });
//     }

//     const admin = await Admin.findOne({ email });

//     if (admin) {
//       return res.status(402).json({
//         message: "This email has been used",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Admin.create({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     return res.status(200).json({
//       message: "Account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     return res.status(500).json({
//       message: "Something went wrong during registration",
//       success: false,
//     });
//   }
// };

// // Admin Login
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Please fill the credentials",
//         success: false,
//       });
//     }

//     let admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, admin.password);

//     if (!isPasswordMatch) {
//       return res.status(402).json({
//         message: "Incorrect password",
//         success: false,
//       });
//     }

//     const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     admin = {
//       _id: admin._id,
//       username: admin.username,
//       email: admin.email,
//       profilePic: admin.profilePic,
//       bio: admin.bio,
//     };

//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 1 * 60 * 60 * 1000, // 1 hour
//       })
//       .json({
//         message: `Welcome Admin ${admin.username}`,
//         success: true,
//         admin,
//       });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({
//       message: "Something went wrong during login",
//       success: false,
//     });
//   }
// };

// // Admin Logout
// const logout = async (_, res) => {
//   try {
//     return res
//       .cookie("token", "", {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 0, // Immediately expire the cookie
//       })
//       .json({
//         message: "Logged out successfully...",
//         success: true,
//       });
//   } catch (error) {
//     console.error("Error during logout:", error);
//     return res.status(500).json({
//       message: "Something went wrong during logout",
//       success: false,
//     });
//   }
// };

// // Edit Admin Profile
// const editProfile = async (req, res) => {
//   try {
//     const adminId = req.id;
//     const { username, email, bio } = req.body;
//     const profilePic = req.file;

//     let cloudResponse;
//     if (profilePic) {
//       const fileUri = getDataUri(profilePic);
//       cloudResponse = await cloudinary.uploader.upload(fileUri);
//     }

//     const admin = await Admin.findById(adminId).select("-password");
//     if (!admin) {
//       return res
//         .status(404)
//         .json({ message: "Admin not found", success: false });
//     }

//     // Update fields if provided
//     if (bio) admin.bio = bio;
//     if (email) admin.email = email;
//     if (username) admin.username = username;
//     if (profilePic) admin.profilePic = cloudResponse.secure_url; // Update profile pic URL

//     await admin.save();

//     return res.json({
//       message: "Profile updated successfully",
//       success: true,
//       admin,
//     });
//   } catch (error) {
//     console.error("Error during profile update:", error);
//     return res.status(500).json({
//       message: "Something went wrong during profile update",
//       success: false,
//     });
//   }
// };

// // Publicly accessible route to get all admin details and their projects
// const getAdminDetailsPublic = async (req, res) => {
//   try {
//     const { adminId } = req.params; // Assuming you'll pass adminId in the request

//     // Find admin by ID and populate the projects field
//     const admin = await Admin.findById(adminId)
//       .populate("projects") // Populate projects associated with the admin
//       .select("-password"); // Exclude password field for security

//     if (!admin) {
//       return res.status(404).json({
//         message: "Admin not found",
//         success: false,
//       });
//     }

//     // Return admin details along with projects
//     return res.status(200).json({
//       message: "Admin details fetched successfully",
//       success: true,
//       admin,
//     });
//   } catch (error) {
//     console.error("Error fetching admin details:", error);
//     return res.status(500).json({
//       message: "Server error while fetching admin details",
//       success: false,
//     });
//   }
// };

// export default {
//   login,
//   register,
//   logout,
//   editProfile,
//   getAdminDetailsPublic,
// };

import { Admin } from "../model/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWT import
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../database/cloudinary.js";

// Register Admin (Only allow one admin)


const register = async (req, res) => {
  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({
        message: "An admin account already exists. Multiple registrations are not allowed.",
        success: false,
      });
    }

    const { username, bio, email, password, profilePic } = req.body;

    // Validate that all required fields are provided
    if (!username || !bio || !email || !password) {
      return res.status(400).json({
        message: "All required fields (username, bio, email, password) must be provided.",
        success: false,
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin record in the database
    const newAdmin = new Admin({
      username,
      bio,
      email,
      password: hashedPassword,
      profilePic: profilePic || "", // Optional field, default to empty string if not provided
    });

    await newAdmin.save();

    return res.status(201).json({
      message: "Admin account created successfully",
      success: true,
      data: newAdmin, // Optionally return the newly created admin data
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Something went wrong during registration",
      success: false,
    });
  }
};



// Admin Login (Ensure only one login session)
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Please fill the credentials",
//         success: false,
//       });
//     }

//     const admin = await Admin.findOne({ email });

//     if (!admin) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, admin.password);

//     if (!isPasswordMatch) {
//       return res.status(402).json({
//         message: "Incorrect password",
//         success: false,
//       });
//     }

//     // Check if there's already a logged-in session
//     const token = req.cookies.token;
//     if (token) {
//       return res.status(403).json({
//         message:
//           "An admin is already logged in. Please log out before attempting to log in again.",
//         success: false,
//       });
//     }

//     // Generate a new token if no session exists
//     const newToken = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     return res
//       .cookie("token", newToken, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 1 * 60 * 60 * 1000, // 1 hour
//       })
//       .json({
//         message: `Welcome Admin ${admin.username}`,
//         success: true,
//         admin: {
//           _id: admin._id,
//           username: admin.username,
//           email: admin.email,
//           profilePic: admin.profilePic,
//           bio: admin.bio,
//         },
//       });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({
//       message: "Something went wrong during login",
//       success: false,
//     });
//   }
// };

//allow admin to login from different device art same time
 const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password input
    if (!email || !password) {
      return res.status(401).json({
        message: "Please fill the credentials",
        success: false,
      });
    }

    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(402).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Generate a new token for each login, allowing multiple devices to login simultaneously
    const newToken = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Set the token as an HTTP-only cookie
    return res
      .cookie("token", newToken, {
        httpOnly: true,
        sameSite: "strict", // Protect against CSRF attacks
        maxAge: 1 * 60 * 60 * 1000, // Cookie expires in 1 hour
      })
      .json({
        message: `Welcome Admin ${admin.username}`,
        success: true,
        admin: {
          _id: admin._id,
          username: admin.username,
          email: admin.email,
          profilePic: admin.profilePic,
          bio: admin.bio,
        },
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Something went wrong during login",
      success: false,
    });
  }
};

// Admin Logout
const logout = async (_, res) => {
  try {
    return res
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0, // Immediately expire the cookie
      })
      .json({
        message: "Logged out successfully...",
        success: true,
      });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      message: "Something went wrong during logout",
      success: false,
    });
  }
};

// Edit Admin Profile
const editProfile = async (req, res) => {
  try {
    const adminId = req.id;
    const { username, email, bio } = req.body;
    const profilePic = req.file;

    let cloudResponse;
    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    // Update fields if provided
    if (bio) admin.bio = bio;
    if (email) admin.email = email;
    if (username) admin.username = username;
    if (profilePic) admin.profilePic = cloudResponse.secure_url; // Update profile pic URL

    await admin.save();

    return res.json({
      message: "Profile updated successfully",
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Error during profile update:", error);
    return res.status(500).json({
      message: "Something went wrong during profile update",
      success: false,
    });
  }
};

// Publicly accessible route to get admin details and their projects
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findOne().select("-password -projects"); // Ensure profilePic is included
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// GET projects associated with the admin
const getAdminProjects = async (req, res) => {
  try {
    // Find the admin and populate their projects
    const admin = await Admin.findOne().populate('projects');

    if (!admin || !admin.projects.length) {
      return res.status(404).json({ message: 'No projects found', success: false });
    }

    res.status(200).json({
      success: true,
      projects: admin.projects, // Return the projects associated with the admin
    });
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ message: 'Server error', success: false });
  }
};




export default {
  login,
  register,
  logout,
  editProfile,
  getAdminDetails,
  getAdminProjects
};
