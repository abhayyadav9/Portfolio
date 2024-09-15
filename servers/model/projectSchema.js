import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,  // Corrected from `require`
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",  // Referencing the Admin model
    required: true, // Ensure that author is always provided
  },
  projectDescription: {
    type: String,
    required: true,  // Corrected from `require`
  },
  projectLink: {
    type: String,
    required: false,  // Optional field for project link
  },
  projectImage: {
    type: String,
    required: true,  // Corrected from `require`
  },
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

export const Project = mongoose.model("Project", projectSchema);  // Capitalized the model name
