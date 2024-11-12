import { useAdmin } from '@/contexts/publicViewContext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineEdit } from "react-icons/md";
import { useSelector } from 'react-redux';

const AdminProfile = () => {
  const adminDetail = useSelector((state) => state.auth.adminDetail);

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    email: '',
    profilePic: '',
    cv: '', // Add a field for the CV
  });

  const [profileImage, setProfileImage] = useState(null); // Store uploaded image file
  const [cvFile, setCvFile] = useState(null); // Store uploaded CV file
  const [previewImage, setPreviewImage] = useState(''); // Store image preview URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (adminDetail) {
      setFormData({
        username:adminDetail.username || '',
        bio: adminDetail.bio || '',
        email: adminDetail.email || '',
        profilePic: adminDetail.profilePic || '',
      });
      setPreviewImage(adminDetail.profilePic || '');
    }
  }, [adminDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Set file object
      setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
    }
  };

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file); // Set CV file object
    }
  };

  const handleEditClick = () => {
    document.getElementById('profilePicInput').click(); // Trigger file input
  };

  const handleCvClick = () => {
    document.getElementById('cvInput').click(); // Trigger CV file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('username', formData.username);
    formDataToSubmit.append('bio', formData.bio);
    formDataToSubmit.append('email', formData.email);
  
    if (profileImage) {
      formDataToSubmit.append('profilePic', profileImage); // For profile picture
    }
  
    // Ensure you are adding the CV file correctly
    if (cvFile) { // Ensure you have a state for the CV file
      formDataToSubmit.append('cv', cvFile); // Append the CV file with the correct field name
    }
  
    console.log("Form data being submitted: ", Array.from(formDataToSubmit)); // Log form data
  
    try {
      await axios.put('https://portfolio-servers.onrender.com/api/v1/admin/editprofile', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Section */}
        <div className="mb-6 text-center">
          <div className="relative inline-block">
            <img
              src={previewImage || '/default-profile.png'} // Default image if no preview available
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover"
            />
            <button
              type="button"
              onClick={handleEditClick}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full opacity-75 hover:opacity-100"
            >
              <MdOutlineEdit size={24} />
            </button>
          </div>
          <input
            type="file"
            id="profilePicInput"
            name="profilePic"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* CV Section */}
        <div className="mb-6 text-center">
          <label htmlFor="cvInput" className="block text-sm font-medium text-gray-700 mb-2">
            Upload CV (PDF only)
          </label>
          <button
            type="button"
            onClick={handleCvClick}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Upload CV
          </button>
          <input
            type="file"
            id="cvInput"
            name="cvFile"
            accept="application/pdf"
            onChange={handleCvChange}
            style={{ display: 'none' }}
          />
          {cvFile && <p className="mt-2 text-sm text-gray-600">CV: {cvFile.name}</p>}
        </div>

        {/* Username */}
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            rows="4"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`inline-flex justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
