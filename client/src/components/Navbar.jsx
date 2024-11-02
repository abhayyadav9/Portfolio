// import React from "react";
// import { Link } from "react-router-dom";
// import { useTheme } from "../contexts/ThemeContext";
// import Switch from "@mui/material/Switch";
// import SparklesText from "./magicui/sparkles-text";
// import { styled } from "@mui/material";

// const Navbar = () => {
//   const { isDarkMode, toggleTheme } = useTheme();
//   const [isOpen, setIsOpen] = React.useState(false);

//   const handleToggleMenu = () => setIsOpen(!isOpen);

//   const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//     width: 52,
//     height: 26,
//     padding: 5,
//     "& .MuiSwitch-switchBase": {
//       margin: 0,
//       padding: 1,
//       transform: "translateX(6px)",
//       "&.Mui-checked": {
//         color: "#fff",
//         transform: "translateX(24px)",
//         "& + .MuiSwitch-track": {
//           backgroundColor: "#8796A5",
//         },
//       },
//     },
//     "& .MuiSwitch-thumb": {
//       backgroundColor: "#001e3c",
//       width: 24,
//       height: 24,
//     },
//     "& .MuiSwitch-track": {
//       opacity: 1,
//       backgroundColor: "#aab4be",
//       borderRadius: 20 / 2,
//     },
//   }));

//   return (
//     <div className={`w-full fixed top-0 left-0 z-50 backdrop-blur-md`}>
//       <nav className={`w-full p-4 shadow-lg rounded-lg transition-all duration-500 ease-in-out ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
//         <div className="flex items-center justify-between">
//           <div className={`text-lg font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//             <SparklesText className="text-lg" text="ABHAY YADAV" />
//           </div>
//           <div className="hidden lg:flex items-center space-x-4">
//             {["/", "/project", "/contact"].map((path) => (
//               <Link
//                 key={path}
//                 to={path}
//                 className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-200"}`}
//               >
//                 {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//               </Link>
//             ))}
//             <MaterialUISwitch
//               sx={{ m: 0 }}
//               defaultChecked
//               size="small"
//               checked={isDarkMode}
//               onChange={toggleTheme}
//             />
//           </div>
//           <button onClick={handleToggleMenu} className={`lg:hidden text-${isDarkMode ? "white" : "gray-900"} focus:outline-none`}>
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//             </svg>
//           </button>
//         </div>
//         <div className={`lg:hidden mt-1 flex flex-col items-center space-y-2 transition-all duration-500 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}>
//           {["/", "/project", "/contact"].map((path) => (
//             <Link
//               key={path}
//               to={path}
//               className={`block px-4 py-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? "text-white hover:bg-gray-700" : "text-gray-900 hover:bg-gray-200"}`}
//               onClick={handleToggleMenu}
//             >
//               {path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//             </Link>
//           ))}
//           <MaterialUISwitch
//             sx={{ m: 0 }}
//             defaultChecked
//             size="small"
//             checked={isDarkMode}
//             onChange={toggleTheme}
//           />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useTheme } from "../contexts/ThemeContext";
import { styled, Switch } from "@mui/material";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { isDarkMode, toggleTheme } = useTheme();

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
        "& + .MuiSwitch-track": {
          backgroundColor: "#8796A5",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 24,
      height: 24,
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  }));


  const user = "recruiter";
  return (
    <div className={`  ${isDarkMode?" bg-black ":" bg-white"} ${isDarkMode?"text-white ":" "}shadow-sm sticky top-0 z-50 shadow-md  bg-gradient-to-b from-purple-40 to-purple-90`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div className="mr-4">
          <h1 className="text-2xl font-bold text-gray-800">
          <span className={` ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>Abhay</span><span className="text-[#F83002]"> Yadav</span>
          </h1>
        </div>
        <div  className={` ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }flex items-center gap-8`}>
          <ul  className={` ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }  flex font-medium items-center gap-5 text-gray-700`}>
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/project"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
                <li>


                  <MaterialUISwitch
              sx={{ m: 0 }}
              defaultChecked
              size="small"
              checked={isDarkMode}
              onChange={toggleTheme}
            /> 
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
