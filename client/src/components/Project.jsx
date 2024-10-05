import React, { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/publicViewContext";
import { useTheme } from "@/contexts/themeContext";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import ProjectDialog from "./ProjectDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"; // For formatting dates

const Project = () => {
  const { projects } = useAdmin(); // Fetching projects
  const { isDarkMode } = useTheme(); // Fetching theme context
  const [sortedProjects, setSortedProjects] = useState([]); // To store sorted projects
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    // Sort projects based on the selected sort option
    const sortProjects = (option) => {
      let sortedArray = [...projects];
      if (option === "new") {
        sortedArray.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (option === "old") {
        sortedArray.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (option === "beginner") {
        sortedArray = sortedArray.filter(
          (project) => project.difficulty === "beginner"
        );
      }
      setSortedProjects(sortedArray);
    };

    sortProjects(sortOption);
  }, [projects, sortOption]);

  const openDialog = (project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
  };

  return (
    <div
      className={`mt-20 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mt-8 mx-auto p-4">
        

        {/* Sorting Dropdown */}
        <div className="mb-6">
          <Select onValueChange={(value) => setSortOption(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="new">Newest First</SelectItem>
                <SelectItem value="old">Oldest First</SelectItem>
                <SelectItem value="beginner">Beginner Projects</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* My Projects Heading */}
        <div className="flex justify-center items-center mb-8">
          <h1
            className="text-4xl font-bold animate-bounce text-center"
            style={{ animationDuration: "1.5s" }}
          >
            My Projects
          </h1>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProjects && sortedProjects.length > 0 ? (
            sortedProjects.map((project) =>
              project ? (
                <NeonGradientCard
                  key={project._id}
                  className={`max-w-sm text-center flex flex-col items-center justify-center ${
                    isDarkMode ? "bg-gray-800" : "bg-white"
                  }`}
                  onClick={() => openDialog(project)}
                >
                  <img
                    src={
                      project.projectImage || "https://via.placeholder.com/150"
                    }
                    alt={project.projectName || "Project Image"}
                    className="h-40 w-full object-cover mb-4 rounded-lg"
                  />
                  <h3
                    className={`text-lg font-bold mb-2 bg-gradient-to-br from-[#ff2975] to-[#00FFF1] bg-clip-text text-transparent`}
                  >
                    {project.projectName || "Untitled Project"}
                  </h3>
                  <p
                    className={`mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.projectDescription || "No description available."}
                  </p>
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.projectLink ? "Project Link" : "No link available"}
                  </a>
                  <p
                    className={`mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.createdAt
                      ? format(new Date(project.createdAt), "yyyy-MM-dd")
                      : "No date available"}
                  </p>
                </NeonGradientCard>
              ) : null
            )
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      </div>

      {/* Project Dialog */}
      <ProjectDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={selectedProject?.projectName}
        description={selectedProject?.projectDescription}
        image={selectedProject?.projectImage}
        link={selectedProject?.projectLink}
      />
    </div>
  );
};

export default Project;
