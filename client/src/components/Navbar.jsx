import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Switch } from "./ui/switch";
import SparklesText from "./magicui/sparkles-text";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-opacity-80 backdrop-blur-md">
      <nav
        className={`w-full p-4 shadow-lg rounded-lg transition-all duration-500 ease-in-out ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <SparklesText className="text-lg" text=" ABHAY YADAV" />
           
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isDarkMode
                  ? "text-white hover:text-blue-400 hover:bg-gray-700"
                  : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/project"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isDarkMode
                  ? "text-white hover:text-blue-400 hover:bg-gray-700"
                  : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
              }`}
            >
              Project
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isDarkMode
                  ? "text-white hover:text-blue-400 hover:bg-gray-700"
                  : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
              }`}
            >
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              className={`ml-4 p-2 rounded-full transition duration-500 focus:outline-none transform hover:scale-110 ${
                isDarkMode
                  ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                className={`relative w-12 h-4 flex items-center rounded-full transition-colors duration-500 ease-in-out ${
                  isDarkMode ? "bg-yellow-400" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-0 top-0 w-6 h-4 bg-white rounded-full transition-transform duration-500 ease-in-out ${
                    isDarkMode ? "transform translate-x-6" : "transform translate-x-0"
                  }`}
                />
              </Switch>
            </button>
          </div>
          <button
            onClick={handleToggleMenu}
            className={`lg:hidden text-${isDarkMode ? "white" : "gray-900"} focus:outline-none`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`lg:hidden mt-1 flex flex-col items-center space-y-2 transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <Link
            to="/"
            className={`block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isDarkMode
                ? "text-white hover:text-blue-400 hover:bg-gray-700"
                : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
            }`}
            onClick={handleToggleMenu}
          >
            Home
          </Link>
          <Link
            to="/project"
            className={`block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isDarkMode
                ? "text-white hover:text-blue-400 hover:bg-gray-700"
                : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
            }`}
            onClick={handleToggleMenu}
          >
            Projects
          </Link>
          <Link
            to="/contact"
            className={`block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isDarkMode
                ? "text-white hover:text-blue-400 hover:bg-gray-700"
                : "text-gray-900 hover:text-blue-600 hover:bg-gray-200"
            }`}
            onClick={handleToggleMenu}
          >
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            className={`ml-4 p-2 rounded-full transition duration-500 focus:outline-none transform hover:scale-110 ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            <Switch
              checked={isDarkMode}
              onChange={toggleTheme}
              className={`relative w-12 h-4 flex items-center rounded-full transition-colors duration-500 ease-in-out ${
                isDarkMode ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute left-0 top-0 w-6 h-4 bg-white rounded-full transition-transform duration-500 ease-in-out ${
                  isDarkMode ? "transform translate-x-6" : "transform translate-x-0"
                }`}
              />
            </Switch>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
