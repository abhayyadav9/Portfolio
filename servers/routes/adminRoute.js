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
// router.route('/editProfile').put(authenticateAdmin, upload.single('cv'), adminController.editProfile);

router.route('/editProfile').put(authenticateAdmin, upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'cv', maxCount: 1 }
  ]), adminController.editProfile);
  

router.get("/public/admindetails", adminController.getAdminDetails);
router.get("/public/adminprojects", adminController.getAdminProjects);




export default router;



// Edit profile route - ensures both profilePic and cvFile can be uploaded
// router.route('/editProfile')
//   .put(
//     authenticateAdmin,
//     upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), // Adjust based on your multer setup
//     adminController.editProfile
//   );


