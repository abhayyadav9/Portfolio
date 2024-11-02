import React from "react";
import { motion } from "framer-motion";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setSelectProject } from "@/redux/projectSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define animation configurations
const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const textVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.5, ease: "easeOut" },
  },
};

const ProjectCard = ({ project }) => {
  const formattedDate = project.createdAt
    ? format(new Date(project.createdAt), "yyyy-MM-dd")
    : "No date available";
    
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProjectClick = (project) => {
    // Check if the current project is the selected one
    dispatch(setSelectProject(project)); // Set the selected project in the redux store
    navigate("/view-project"); // Navigate to the view project page
  };

  return (
    <motion.div
      className="max-w-sm lg:max-w-md mx-auto sm:mx-4 mb-10 p-5 text-white font-sans flex flex-col items-center lg:items-start transition-transform duration-500"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <NeonGradientCard className=" w-full md:w-[50vh]" onClick={() => handleProjectClick(project)}>
        <motion.div className="overflow-hidden rounded-lg">
          <motion.img
            src={project?.projectImage}
            alt="project"
            className="w-full h-30 sm:h-64 lg:h-50 object-cover transition-transform duration-500 hover:scale-110"
          />
        </motion.div>

        <motion.h3
          className="mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text animate-pulse text-center lg:text-left"
          variants={textVariants}
        >
          {project.projectName}
        </motion.h3>

        <motion.p
          className="mt-2 text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300 text-justify"
          variants={textVariants}
        >
          {project?.projectDescription}
        </motion.p>

        <motion.a
          href={project?.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-base lg:text-lg font-bold text-teal-300 hover:text-orange-400 transition-colors duration-300 underline"
          variants={textVariants}
        >
          View Project
        </motion.a>

        <motion.p
          className="mt-1 text-xs lg:text-sm text-gray-500"
          variants={textVariants}
        >
          Created on {formattedDate}
        </motion.p>
        
        <motion.h4
          className="mt-2 text-base lg:text-lg font-semibold text-purple-500 text-right lg:text-right"
          variants={textVariants}
        >
          By: Abhay Yadav
        </motion.h4>

        <div>
          <Button onClick={() => handleProjectClick(project)}>
            View
          </Button>
        </div>
      </NeonGradientCard>
    </motion.div>
  );
};

export default ProjectCard;
