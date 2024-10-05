import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import AdminContact from './AdminContact';
import AdminProject from './AdminProject';
import AdminProfile from './AdminProfile';

const AdminHome = () => {
  return (
    <div>
      <AdminNavBar />
      <div className="content-container mt-32">
        <Routes>
          <Route path="contact" element={<AdminContact />} />
          <Route path="project" element={<AdminProject />} />
          <Route path="profile" element={<AdminProfile className="mt-10" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminHome;
