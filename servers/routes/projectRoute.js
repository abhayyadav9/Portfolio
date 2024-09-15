import express from "express";
import authenticateAdmin from "../middleware/authenticateAdmin.js";
import upload from "../utils/multer.js";
import projectControll from "../controller/projectControll.js";

const router = express.Router();

// Route for adding a project
router.post(
  "/addproject",
  authenticateAdmin,
  upload.single("projectImage"),
  projectControll.addProject
);

// Route for editing a project
router.put(
  "/editproject/:projectId", // Changed 'projectid' to 'projectId' to be consistent
  authenticateAdmin,
  upload.single("projectImage"),
  projectControll.editProject
);

// Route for getting admin profile
router.get(
  "/getadminprofile",
  authenticateAdmin,
  projectControll.getAdminProfile
);

export default router;
