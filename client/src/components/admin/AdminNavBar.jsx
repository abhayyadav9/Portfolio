import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      await axios.post('https://portfolio-servers.onrender.com/api/v1/admin/logout', {}, { withCredentials: true });
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-blue-500 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyApp</div>
        <ul className="flex space-x-4">
          <li><Link to="/admin/home/contact" className="text-white hover:text-gray-200">Contact</Link></li>
          <li><Link to="/admin/home/project" className="text-white hover:text-gray-200">Project</Link></li>
          <li><Link to="/admin/home/profile" className="text-white hover:text-gray-200">Profile</Link></li>
          <li><button onClick={logoutHandle} className="text-white hover:text-gray-200">Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
