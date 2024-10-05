import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch admin details
    axios.get('https://abhay-portfolio-ky57.vercel.app/api/v1/admin/public/admindetails')
      .then((res) => setAdmin(res.data.admin))
      .catch((err) => console.error(err));

    // Fetch projects separately
    axios.get('https://abhay-portfolio-ky57.vercel.app/api/v1/admin/public/adminprojects')
      .then((res) => setProjects(res.data.projects))
      .catch((err) => console.error(err));
  }, []);

  return (
    <AdminContext.Provider value={{ admin, projects }}>
      {children}
    </AdminContext.Provider>
  );
};
