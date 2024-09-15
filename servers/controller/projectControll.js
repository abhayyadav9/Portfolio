import cloudinary from "../database/cloudinary.js";
import { Admin } from "../model/adminSchema.js";
import { Project } from "../model/projectSchema.js";
import sharp from "sharp"; // Assuming sharp is used for image optimization
import getDataUri from "../utils/dataUri.js";

// const addProject = async (req, res) => {
//   try {
//     const { projectName, projectDescription, projectLink } = req.body;
//     const projectImage = req.file;
//     const authorId = req.id;

//     if (!projectImage) {
//       return res
//         .status(400)
//         .json({ message: "Please upload a project image", status: false });
//     }

//     // Optimize and format the project image using sharp
//     const optimizedImageBuffer = await sharp(projectImage.buffer)
//       .resize({ width: 800, height: 800, fit: "inside" }) // Correct width spelling
//       .toFormat("jpeg", { quality: 80 }) // Correct .toFormat() usage
//       .toBuffer();

//     // Convert buffer to base64 and form a data URI
//     const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
//       "base64"
//     )}`; // Correct base64 formatting

//     // Upload image to Cloudinary
//     const cloudResponse = await cloudinary.uploader.upload(fileUri);

//     // Create the project document
//     const project = await Project.create({
//       projectName,
//       projectDescription,
//       projectLink,
//       authorId,
//       projectImage: cloudResponse.secure_url,
//     });

//     // Find the admin by ID and add the project to their projects array
//     const admin = await Admin.findById(authorId);
//     if (admin) {
//       admin.projects.push(project._id);
//       await admin.save();
//     }

//     // Populate the 'author' field in the project document
//     await project.populate({
//       path: "author",
//       select: "", // You can specify the fields you want to select, or leave it empty for all fields
//     });

//     // Send a successful response with the project data
//     res
//       .status(201)
//       .json({ message: "Project created successfully", status: true, project });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error", status: false });
//   }
// };
const addProject = async (req, res) => {
  try {
    const adminId = req.id;
    const { projectName, projectDescription, projectLink } = req.body;
    const projectImage = req.file;

    // Optimize and format the project image using sharp
    //     const optimizedImageBuffer = await sharp(projectImage.buffer)
    //       .resize({ width: 800, height: 800, fit: "inside" }) // Correct width spelling
    //       .toFormat("jpeg", { quality: 80 }) // Correct .toFormat() usage
    //       .toBuffer();

    //     // Convert buffer to base64 and form a data URI
    //     const fileUri = ` data:image/jpeg;base64,${optimizedImageBuffer.toString( "base64"
    //  )}`;

    let cloudResponse;
    if (projectImage) {
      const fileUri = getDataUri(projectImage);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    // Create a new project
    const project = await Project.create({
      projectName,
      projectDescription,
      projectLink,
      author: adminId, // Link to the admin's ID
      projectImage: cloudResponse?.secure_url,
    });

    // Find the admin and update the projects array
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    // Push the new project's ID to the admin's projects array
    admin.projects.push(project._id);
    await admin.save();

    return res.status(201).json({
      message: "Project added successfully",
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({
      message: "Server error while adding project",
      success: false,
    });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.id;

    // Find admin by ID and populate the projects field
    const admin = await Admin.findById(adminId)
      .populate("projects")
      .select("-password");

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    res.json({
      message: "Admin profile fetched successfully",
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    res.status(500).json({
      message: "Server error while fetching admin profile",
      success: false,
    });
  }
};

const editProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { projectName, projectDescription, projectLink } = req.body;
    const projectImage = req.file;

    //find the project by id

    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ message: "Project not found", success: false });
    }
    //update the project details
    if (projectName) project.projectName = projectName;
    if (projectDescription) project.projectDescription = projectDescription;
    if (projectLink) project.projectLink = projectLink;
    if (projectImage) {
      const fileUri = getDataUri(projectImage);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      project.projectImage = cloudResponse.secure_url;
    }

    await project.save();

    return res.status(200).json({
      message: "Project updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

export default { addProject, getAdminProfile,editProject };
