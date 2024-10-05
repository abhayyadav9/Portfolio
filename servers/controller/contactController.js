import Contact from "../model/contactSchema.js";
import cloudinary from "../database/cloudinary.js";
import getDataUri from "../utils/dataUri.js"; // Helper function to convert image buffer to data URI

// Add a new contact
export const addContact = async (req, res) => {
  try {
    const { socialMedia, socialLink, tagline } = req.body;
    const icon = req.file; // Assuming the icon image is sent as a file

    if (!socialMedia || !socialLink) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    let iconUrl;
    if (icon) {
      const fileUri = getDataUri(icon);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      iconUrl = cloudResponse.secure_url;
    }

    // Create new contact
    const contact = await Contact.create({
      socialMedia,
      socialLink,
      tagline,
      icon: iconUrl || "", // Use the uploaded icon URL or an empty string
    });

    res.status(201).json({
      message: "Contact added successfully",
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({
      message: "Error adding contact",
      error: error.message || "Unknown error",
    });
  }
};

// Edit an existing contact
export const editContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { socialMedia, socialLink, tagline } = req.body;
    const icon = req.file; // Assuming the icon image is sent as a file

    // Find and update the contact
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }

    // Update fields if provided
    if (socialMedia) contact.socialMedia = socialMedia;
    if (socialLink) contact.socialLink = socialLink;
    if (tagline) contact.tagline = tagline;

    if (icon) {
      const fileUri = getDataUri(icon);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      contact.icon = cloudResponse.secure_url; // Update icon URL
    }

    await contact.save();

    res.status(200).json({
      message: "Contact updated successfully",
      success: true,
      contact,
    });
  } catch (error) {
    console.error("Error editing contact:", error);
    res.status(500).json({
      message: "Server error while editing contact information",
      success: false,
    });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }

    return res.status(200).json({ message: "Contact deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Server error while deleting contact", success: false });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json({
      message: "All contacts fetched successfully",
      success: true,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      message: "Server error while fetching contacts",
      success: false,
    });
  }
};
