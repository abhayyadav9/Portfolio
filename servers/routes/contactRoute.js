import express from "express";
import { addContact, deleteContact, editContact, getAllContacts } from "../controller/contactController.js";
import authenticateAdmin from '../middleware/authenticateAdmin.js'

const router = express.Router();

router.post("/addcontact",authenticateAdmin,addContact);
router.put("/editcontact/:contactId",authenticateAdmin,editContact);
router.delete("/deletecontact/:contactId",authenticateAdmin,deleteContact);
router.get("/getcontact",authenticateAdmin,getAllContacts);


export default router;