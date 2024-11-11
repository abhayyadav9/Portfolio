import React from "react";
import { motion } from "framer-motion";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setSelectProject } from "@/redux/projectSlice";
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
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const formattedDate = project.createdAt
    ? format(new Date(project.createdAt), "yyyy-MM-dd")
    : "No date available";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProjectClick = (project) => {
    dispatch(setSelectProject(project));
    navigate("/view-project");
  };

  return (
    <motion.div
      className={`max-w-sm lg:max-w-md mx-auto sm:mx-4 font-sans flex flex-col items-center lg:items-start transition-transform duration-500 
        
        shadow-lg rounded-lg ring-1 `}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <NeonGradientCard
        className="w-full md:w-[50vh] cursor-pointer"
        onClick={() => handleProjectClick(project)}
      >
        <motion.div className="overflow-hidden rounded-lg relative">
          <motion.img
            src={project?.projectImage}
            alt="project"
            className="w-full h-30 sm:h-64 lg:h-50 object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
        </motion.div>

        <motion.h3
          className={`mt-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-center lg:text-left 
            ${isDarkMode ? "text-orange-300" : "text-indigo-500"} 
            animate-pulse bg-clip-text`}
          variants={textVariants}
        >
          {project?.projectName}
        </motion.h3>

        <motion.p
          className="mt-2 text-sm sm:text-base lg:text-lg leading-relaxed text-justify"
          style={{ color: isDarkMode ? "#e0e0e0" : "#4a4a4a" }}
          variants={textVariants}
        >
          {project?.projectDescription}
        </motion.p>

        <motion.a
          href={project?.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block mt-4 text-base lg:text-lg font-bold underline transition-colors duration-300 
            ${isDarkMode ? "text-teal-300 hover:text-orange-400" : "text-blue-500 hover:text-orange-500"}`}
          variants={textVariants}
        >
          View Project
        </motion.a>

        <motion.p
          className="mt-1 text-xs lg:text-sm"
          style={{ color: isDarkMode ? "#a0a0a0" : "#6b6b6b" }}
          variants={textVariants}
        >
          Created on {formattedDate}
        </motion.p>

        <motion.h4
          className={`mt-2 text-base lg:text-lg font-semibold text-right lg:text-right 
            ${isDarkMode ? "text-purple-400" : "text-blue-600"}`}
          variants={textVariants}
        >
          By: Abhay Yadav
        </motion.h4>
      </NeonGradientCard>
    </motion.div>
  );
};

export default ProjectCard;
