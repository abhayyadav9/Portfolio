import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

const AddProject = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectImage, setProjectImage] = useState(null);

  // Function to fetch projects from your API
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v2/project/getprojects', {
        withCredentials: true,
      });
      setProjects(response.data.projects); // Assuming API returns a 'projects' array
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects when the component mounts
  }, []);

  // Function to open the dialog box
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog box
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to handle the project addition
  const handleAddProject = async () => {
    const formData = new FormData();
    formData.append('projectName', projectName);
    formData.append('projectDescription', projectDescription);
    formData.append('projectLink', projectLink);
    if (projectImage) formData.append('projectImage', projectImage);

    try {
      const response = await axios.post('http://localhost:8000/api/v2/project/addproject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Ensure credentials are passed here too
      });
      console.log('Project added successfully:', response.data);
      // Reset the form fields after successful addition
      setProjectName('');
      setProjectDescription('');
      setProjectLink('');
      setProjectImage(null);
      handleCloseDialog();
      fetchProjects(); // Refresh project list after adding a new project
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  // Function to handle image file selection
  const handleImageChange = (e) => {
    setProjectImage(e.target.files[0]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project Management
      </Typography>

      {/* Button to add a new project */}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Project
      </Button>

      {/* Dialog for adding a new project */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Description"
            fullWidth
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Link"
            fullWidth
            value={projectLink}
            onChange={(e) => setProjectLink(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: '20px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProject} color="primary">
            Add Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display the list of projects */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
              <Typography variant="h6">{project.projectName}</Typography>
              <Typography variant="body1">{project.projectDescription}</Typography>
              <Typography variant="body2">
                URL: <a href={project.projectLink} target="_blank" rel="noopener noreferrer">{project.projectLink}</a>
              </Typography>
              {project.projectImage && (
                <img
                  src={project.projectImage}
                  alt={project.projectName}
                  style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                />
              )}
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AddProject;
