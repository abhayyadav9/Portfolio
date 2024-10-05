import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String }, // For storing profile image URL
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }], // Admin's projects
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
