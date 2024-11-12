import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContact = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ socialMedia: '', socialLink: '', tagline: '' });
  const [editContactId, setEditContactId] = useState(null);
  const [editContact, setEditContact] = useState({ socialMedia: '', socialLink: '', tagline: '' });
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch all contacts when the component mounts
    axios.get('https://portfolio-servers.onrender.com/api/v3/contact/getcontact', {
      withCredentials: true
    })
      .then(response => setContacts(response.data.contacts))
      .catch(error => console.error('Error fetching contacts:', error));
  }, []);

  const handleAddContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('socialMedia', newContact.socialMedia);
    formData.append('socialLink', newContact.socialLink);
    formData.append('tagline', newContact.tagline);
    if (file) formData.append('icon', file);

    try {
      await axios.post('https://portfolio-servers.onrender.com/api/v3/contact/addcontact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      // Clear form and refetch contacts
      setNewContact({ socialMedia: '', socialLink: '', tagline: '' });
      setFile(null);
      const response = await axios.get('https://portfolio-servers.onrender.com/api/v3/contact/getcontact', {
        withCredentials: true
      });
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleEditContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('socialMedia', editContact.socialMedia);
    formData.append('socialLink', editContact.socialLink);
    formData.append('tagline', editContact.tagline);
    if (file) formData.append('icon', file);

    try {
      await axios.put(`https://portfolio-servers.onrender.com/api/v3/contact/editcontact/${editContactId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      // Clear form and refetch contacts
      setEditContactId(null);
      setEditContact({ socialMedia: '', socialLink: '', tagline: '' });
      setFile(null);
      const response = await axios.get('https://portfolio-servers.onrender.com/api/v3/contact/getcontact', {
        withCredentials: true
      });
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error editing contact:', error);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`https://portfolio-servers.onrender.com/api/v3/contact/deletecontact/${contactId}`, {
        withCredentials: true
      });
      // Refetch contacts
      const response = await axios.get('https://portfolio-servers.onrender.com/api/v3/contact/getcontact', {
        withCredentials: true
      });
      setContacts(response.data.contacts);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Contact Management</h1>

      <section className="mb-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Contact</h2>
        <form onSubmit={handleAddContact} className="space-y-4">
          <input
            type="text"
            placeholder="Social Media"
            value={newContact.socialMedia}
            onChange={(e) => setNewContact({ ...newContact, socialMedia: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Social Link"
            value={newContact.socialLink}
            onChange={(e) => setNewContact({ ...newContact, socialLink: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Tagline"
            value={newContact.tagline}
            onChange={(e) => setNewContact({ ...newContact, tagline: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Add Contact
          </button>
        </form>
      </section>

      {editContactId && (
        <section className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Contact</h2>
          <form onSubmit={handleEditContact} className="space-y-4">
            <input
              type="text"
              placeholder="Social Media"
              value={editContact.socialMedia}
              onChange={(e) => setEditContact({ ...editContact, socialMedia: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Social Link"
              value={editContact.socialLink}
              onChange={(e) => setEditContact({ ...editContact, socialLink: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Tagline"
              value={editContact.tagline}
              onChange={(e) => setEditContact({ ...editContact, tagline: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Update Contact
            </button>
          </form>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact List</h2>
        <ul className="space-y-4">
          {contacts.map(contact => (
            <li key={contact._id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{contact.socialMedia}</h3>
                <p>{contact.socialLink}</p>
                <p>{contact.tagline}</p>
                {contact.icon && <img src={contact.icon} alt={contact.socialMedia} width="50" height="50" />}
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditContactId(contact._id);
                    setEditContact({
                      socialMedia: contact.socialMedia,
                      socialLink: contact.socialLink,
                      tagline: contact.tagline
                    });
                  }}
                  className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminContact;
