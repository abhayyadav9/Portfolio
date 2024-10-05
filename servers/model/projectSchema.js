import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: false },
  projectLink: { type: String, required: false },
  projectImage: { type: String }, // For storing project image URL
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" } // Link to admin
},{
  timestamps: true
}
);

export const Project = mongoose.model("Project", projectSchema);
