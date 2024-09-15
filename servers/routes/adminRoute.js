import express from "express";
import adminController from "../controller/adminController.js";  // Import the entire controller object
import authenticateAdmin from '../middleware/authenticateAdmin.js'
import upload from "../utils/multer.js"

const router = express.Router();

// Define your routes
router.route('/signup').post(adminController.register);  // Access controller methods from the object
router.route('/login').post(adminController.login);
router.route('/logout').post(adminController.logout);

// Uncomment the editProfile route when ready
router.route('/editProfile').post(authenticateAdmin,upload.single('profilePic') ,adminController.editProfile);

export default router;
