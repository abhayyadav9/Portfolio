import Contact from "../model/contactSchema.js";

// Add a new contact
export const addContact = async (req, res) => {
  try {
    const { socialMedia, socialLink } = req.body;

    // Validate input
    if (!socialMedia || !socialLink) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Create new contact
    const contact = await Contact.create({
      socialMedia,
      socialLink,
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
    const { socialMedia, socialLink } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { socialMedia, socialLink },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found", success: false });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      success: true,
      contact: updatedContact,
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
