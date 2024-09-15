import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: ""  // Default value for profilePic
    },
    bio: {
        type: String,
        maxlength: 2000  // Limits the bio to 200 characters
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

export const Admin = mongoose.model("Admin", adminSchema);
