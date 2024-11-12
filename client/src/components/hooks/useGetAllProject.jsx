import { setProjects } from '@/redux/projectSlice';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllProject = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProject = async () => {
      try {
        const response = await axios.get('https://portfolio-servers.onrender.com/api/v1/admin/public/adminprojects');
        console.log(response.data.projects);
        // Dispatch the data to Redux
        dispatch(setProjects(response.data.projects));
      } catch (error) {
        console.error(error);
      }
    };

    getAllProject();
  }, [dispatch]);

//   return projects;
};

export default useGetAllProject;
