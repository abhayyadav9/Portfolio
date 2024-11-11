import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { useSelector } from "react-redux";
import ProjectImage from "./ProjectImage";

const ProjectDetail = () => {
  const { selectProject } = useSelector((store) => store.project);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Access isDarkMode from Redux store

  return (
    <div
      className={`flex h-screen w-full justify-center items-center min-h-screen p-3 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-700 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-8 rounded-xl shadow-lg transition-transform duration-500 ${
          isDarkMode
            ? "transform hover:scale-105 neon-card"
            : "bg-white border border-gray-300"
        }`}
      >
        <div className="flex flex-col justify-center items-center text-center space-y-5">
          <h1
            className={`text-4xl font-bold ${
              isDarkMode
                ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse"
                : "text-gray-700"
            }`}
          >
            Project Detail
          </h1>

          <p
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            } text-xl`}
          >
            Explore the details of this amazing project.
          </p>

          <div className="flex flex-auto w-full">
            <div className="text-left w-full space-y-4">
              <h2
                className={`text-2xl font-semibold ${
                  isDarkMode ? "text-orange-400" : "text-gray-800"
                }`}
              >
                {selectProject?.projectName || "Project Name"}
              </h2>

              <p
                className={`text-base leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {selectProject?.projectDescription ||
                  "No description available."}
              </p>

              <div
                className={`text-sm mt-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="font-semibold text-teal-300">Created By:</span>{" "}
                Abhay Yadav
              </div>
              <div
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span className="font-semibold text-teal-300">Created On:</span>{" "}
                {selectProject?.createdAt || "Date not available"}
              </div>
            </div>
            <div>

            {/* {
  selectProject?.projectImage.map((image, index) => {
    return (
      <div key={index} className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={image}
          alt={`Project ${index + 1}`}
          className={`w-full h-64 object-cover transition-transform duration-500 ${
            isDarkMode ? "hover:scale-105 rounded-lg" : ""
          }`}
        />
      </div>
    );
  })
} */}

              {selectProject?.projectImage && (
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={selectProject.projectImage}
                    alt="Project"
                    className={`w-full h-64 object-cover transition-transform duration-500 ${
                      isDarkMode ? "hover:scale-105 rounded-lg" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          </div>

          <a
            href={selectProject?.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 text-lg font-bold ${
              isDarkMode
                ? "text-teal-300 hover:text-orange-400 transition-colors duration-300 underline"
                : "text-blue-500 hover:text-blue-700"
            }`}
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
