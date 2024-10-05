import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Switch from "@mui/material/Switch";
import SparklesText from "./magicui/sparkles-text";
import { Label } from "@mui/icons-material";
import { styled } from "@mui/material";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleMenu = () => setIsOpen(!isOpen);

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 52,
    height: 26,
    padding: 5,
    "& .MuiSwitch-switchBase": {
      margin: 0,
      padding: 1,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(24px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
          ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 24,
      height: 24,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      ...theme.applyStyles("dark", {
        backgroundColor: "#003892",
      }),
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
      ...theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      }),
    },
  }));

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
              className={` rounded-full transition duration-500 focus:outline-none transform hover:scale-40`}
            >
              <MaterialUISwitch
                sx={{ m: 0 }}
                defaultChecked
                size="small"
                {...Label}
                checked={isDarkMode}
                onChange={toggleTheme}
                className={` rounded-full  ${
                  isDarkMode ? "bg-gray-300" : "bg-gray-500"
                }`}
              ></MaterialUISwitch>
            </button>
          </div>
          <button
            onClick={handleToggleMenu}
            className={`lg:hidden text-${
              isDarkMode ? "white" : "gray-900"
            } focus:outline-none`}
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
            className={`ml-4  rounded-full transition duration-500 focus:outline-none transform hover:scale-110 ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
           <MaterialUISwitch
                sx={{ m: 0 }}
                defaultChecked
                size="small"
                {...Label}
                checked={isDarkMode}
                onChange={toggleTheme}
              className={`
                
                `}
            >
              <span
                className={`
                   ${
                     isDarkMode
                       ? "transform translate-x-6"
                       : "transform translate-x-0"
                   }`}
              />
            </MaterialUISwitch>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
