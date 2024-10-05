// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdOutlineEdit, MdDelete } from "react-icons/md";
// import { NeonGradientCard } from "../magicui/neon-gradient-card";
// import { ProjectDialog } from "./ProjectDialog"; // Dialog for editing projects

// const AdminProject = () => {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [admin, setAdmin] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null); // Track selected project for editing
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility

//   // Fetch admin profile on component mount
//   useEffect(() => {
//    fetchAdminProfile();
//   }, []);

//   const fetchAdminProfile = async () => {
//    try {
//     const response = await axios.get(
//       "https://abhay-portfolio-ky57.vercel.app/api/v2/project/getadminprofile",
//       { withCredentials: true }
//     );
//     const { admin } = response.data;
//     setAdmin(admin); // Set the admin data
//     setProjects(admin.projects); // Set the projects data
//    } catch (err) {
//     setError("Error fetching admin profile");
//     console.error(err);
//    }
//   };

//   const deleteHandler = async (projectId) => {
//    try {
//     const response = await axios.delete(
//       `https://abhay-portfolio-ky57.vercel.app/api/v2/project/${projectId}`,
//       { withCredentials: true }
//     );
//     if (response.data.success) {
//       // Update the projects state by removing the deleted project
//       setProjects(projects.filter((project) => project._id !== projectId));
//     } else {
//       setError("Error deleting project");
//     }
//    } catch (error) {
//     setError("Error deleting project");
//     console.error(error);
//    }
//   };

//   // Open the dialog with the selected project
//   const openDialog = (project) => {
//    setSelectedProject(project); // Set the project to edit
//    setIsDialogOpen(true); // Open the dialog
//   };

//   // Close the dialog
//   const closeDialog = () => {
//    setIsDialogOpen(false); // Close the dialog
//    setSelectedProject(null); // Reset the selected project
//   };

//   const updateProject = (updatedProject) => {
//    // Update the projects list with the edited project data
//    setProjects((prevProjects) =>
//     prevProjects.map((proj) =>
//       proj._id === updatedProject._id ? updatedProject : proj
//     )
//    );
//   };

//   return (
//    <div className="container mx-auto p-4">
//     {/* Display admin profile information */}
//     {admin && (
//       <div className="mb-6">
//        <img
//         src={admin.profilePic || "https://via.placeholder.com/150"}
//         alt={admin.username}
//         className="h-40 w-40 object-cover rounded-full mb-4 mx-auto"
//        />
//        <p className="text-center text-lg font-medium">{admin.bio}</p>
//       </div>
//     )}

//     {/* Display all projects */}
//     <div className="grid grid-cols-1 sticky sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {projects.filter(project => project && project._id).map((project) => (
//        <NeonGradientCard
//         key={project._id}
//         className="max-w-sm  text-center flex flex-col items-center justify-center"
//        >
//         <img
//           src={project.projectImage || "https://via.placeholder.com/150"} // Placeholder if no image
//           alt={project.projectName}
//           className="h-40 w-full object-cover mb-4 rounded-lg"
//         />
//         <h3 className="text-lg font-bold mb-2 bg-gradient-to-br from-[#ff2975] from-15% to-[#00FFF1] bg-clip-text text-transparent">
//           {project.projectName}
//         </h3>
//         <p className="text-gray-700 mb-2">{project.projectDescription}</p>
//         <a
//           href={project.projectLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           Project Link
//         </a>
//         <div className="flex mt-4">
//           <MdOutlineEdit
//            className="text-2xl text-blue-500 mr-4 cursor-pointer"
//            onClick={() => openDialog(project)} // Open dialog for editing
//           />
//           <MdDelete
//            className="text-2xl text-red-500 cursor-pointer"
//            onClick={() => deleteHandler(project._id)} // Delete project
//           />
//         </div>
//        </NeonGradientCard>
//       ))}
//     </div>

//     {/* Render the ProjectDialog when isDialogOpen is true */}
//     {isDialogOpen && selectedProject && (
//       <ProjectDialog
//        project={selectedProject}
//        onClose={closeDialog}
//        onSave={updateProject} // Update the parent component when saving changes
//       />
//     )}
//    </div>
//   );
// };

// export default AdminProject;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { NeonGradientCard } from "../magicui/neon-gradient-card";
import { ProjectDialog } from "./ProjectDialog"; // Dialog for editing projects
import AddProject from "./AddProject";

const AdminProject = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project for editing
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility

  // Fetch admin profile on component mount
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const response = await axios.get(
        "https://abhay-portfolio-ky57.vercel.app/api/v2/project/getadminprofile",
        { withCredentials: true }
      );
      const { admin } = response.data;
      if (admin) {
        setAdmin(admin); // Set the admin data
        setProjects(admin.projects || []); // Set the projects data, default to empty array if not available
      } else {
        setError("Admin profile not found");
      }
    } catch (err) {
      setError("Error fetching admin profile");
      console.error(err);
    }
  };

  const deleteHandler = async (projectId) => {
    try {
      const response = await axios.delete(
        `https://abhay-portfolio-ky57.vercel.app/api/v2/project/deleteproject/${projectId}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        // Update the projects state by removing the deleted project
        setProjects(projects.filter((project) => project._id !== projectId));
      } else {
        setError("Error deleting project");
      }
    } catch (error) {
      setError("Error deleting project");
      console.error(error);
    }
  };

  // Open the dialog with the selected project
  const openDialog = (project) => {
    console.log("Opening dialog for project:", project); // Debug log
    setSelectedProject(project); // Set the project to edit
    setIsDialogOpen(true); // Open the dialog
  };

  // Close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false); // Close the dialog
    setSelectedProject(null); // Reset the selected project
  };

  const updateProject = (updatedProject) => {
    console.log("Updating project with:", updatedProject); // Debug log
    // Update the projects list with the edited project data
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj && proj._id === updatedProject._id ? updatedProject : proj
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Display admin profile information */}
      {admin && (
        <div className="mb-6">
          <img
            src={admin.profilePic || "https://via.placeholder.com/150"}
            alt={admin.username}
            className="h-40 w-40 object-cover rounded-full mb-4 mx-auto"
          />
          <p className="text-center text-lg font-medium">{admin.bio}</p>
        </div>
      )}

      {/* Display all projects */}
      <div className="grid grid-cols-1 sticky sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map(
            (project) =>
              project ? ( // Check if project is defined
                <NeonGradientCard
                  key={project._id}
                  className="max-w-sm text-center flex flex-col items-center justify-center"
                >
                  <img
                    src={
                      project.projectImage || "https://via.placeholder.com/150"
                    } // Placeholder if no image
                    alt={project.projectName}
                    className="h-40 w-full object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-bold mb-2 bg-gradient-to-br from-[#ff2975] from-15% to-[#00FFF1] bg-clip-text text-transparent">
                    {project.projectName}
                  </h3>
                  <p className="text-gray-700 mb-2">
                    {project.projectDescription}
                  </p>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Project Link
                  </a>
                  <div className="flex mt-4">
                    <MdOutlineEdit
                      className="text-2xl text-blue-500 mr-4 cursor-pointer"
                      onClick={() => openDialog(project)} // Open dialog for editing
                    />
                    <MdDelete
                      className="text-2xl text-red-500 cursor-pointer"
                      onClick={() => deleteHandler(project._id)} // Delete project
                    />
                  </div>
                </NeonGradientCard>
              ) : null // Render nothing if project is undefined
          )
        ) : (
          <p>No projects available.</p>
        )}

        <div>
          
          <AddProject/>
        </div>
      </div>

      {/* Render the ProjectDialog when isDialogOpen is true */}
      {isDialogOpen && selectedProject && (
        <ProjectDialog
          project={selectedProject}
          onClose={closeDialog}
          onSave={updateProject} // Update the parent component when saving changes
        />
      )}
    </div>
  );
};

export default AdminProject;
