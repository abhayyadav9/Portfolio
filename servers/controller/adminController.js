import { Admin } from "../model/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Missing JWT import
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../database/cloudinary.js";

// Register Admin
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Please check the inputs",
        success: false,
      });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(402).json({
        message: "This email has been used",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({
      message: "Something went wrong during registration",
      success: false,
    });
  }
};

// Admin Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        message: "Please fill the credentials",
        success: false,
      });
    }

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);

    if (!isPasswordMatch) {
      return res.status(402).json({
        message: "Incorrect password",
        success: false,
      });
    }

    // Ensure the secret key is available
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables");
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    admin = {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      profilePic: admin.profilePic,
      bio: admin.bio,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000, // 1 hour
      })
      .json({
        message: `Welcome Admin ${admin.username}`,
        success: true,
        admin,
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
// <--- END OF editProfile FUNCTION --->

export default { login, register, logout, editProfile };
