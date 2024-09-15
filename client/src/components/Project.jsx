import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';

const projects = [
  { id: 1, title: "Project 1", description: "Description for project 1", link: "/project1" },
  { id: 2, title: "Project 2", description: "Description for project 2", link: "/project2" },
  { id: 3, title: "Project 3", description: "Description for project 3", link: "/project3" },
];

const ProjectCard = () => {
  const cardSpring = useSpring({
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 170, friction: 20 },
  });

  return (
    <animated.div style={cardSpring} className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">project.title</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">project.description</p>
      <Link to="{/project}" className="text-blue-500 hover:text-blue-700 underline">
        View Project
      </Link>
    </animated.div>
  );
};

const Project = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">My Projects</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {projects.map((project) => (
          <div key={project.id} className="flex-shrink-0 w-full md:w-1/3">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
