import React from 'react';
import { useSelector } from 'react-redux';
import ProjectCard from './ProjectCard';

const Project = () => {
  const projects = useSelector((state) => state.project.projects);

  return (
    <div className="flex  bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Page Header */}
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600 dark:text-blue-400">
          My Projects
        </h1>

        {/* Sort and Filter Options */}
        {/* Add any necessary dropdown or filters here */}

        {/* Project Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))
          ) : (
            <p className="text-center col-span-full">
              No projects available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
