import GradualSpacing from "@/components/magicui/gradual-spacing";
import ShineBorder from "@/components/magicui/shine-border";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "../contexts/ThemeContext";
import TypingAnimation from "./magicui/typing-animation";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import useGetAdminDetail from "./hooks/useGetAdminDetail";

const Profile = () => {
  const { isDarkMode } = useTheme();
const adminDetail = useSelector((state) => state.auth.adminDetail);


  // const adminDetail = useGetAdminDetail()
  const handleOpenPdf = () => {
    // if (admin.cv) {
    //   const newTab = window.open(admin.cv, "_blank");
    //   if (!newTab) {
    //     alert("Please allow pop-ups for this website to open the CV.");
    //   }
    // } else {
    //   alert("No CV available");
    // }
  };

  // Animation hooks
  const h1Spring = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 50 },
    config: { duration: 1000 },
  });
  const pSpring = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 30 },
    config: { duration: 1200 },
  });
  const imgSpring = useSpring({
    opacity: 1,
    scale: 1,
    from: { opacity: 0, scale: 0.9 },
    config: { duration: 1500 },
  });
const admin="abhat"
  if (!admin) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <>
      <div
        className={`flex items-center justify-center  ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="p-1 max-w-7xl mx-auto">

          <ShineBorder
            className={`flex md:mt-0 mt-[-30vh] flex-col-reverse h-screen  md:flex-row gap-8 items-center w-full max-w-6xl rounded-xl shadow-lg ${
              isDarkMode ? "bg-gray-200" : "bg-gray-50"
            }`}
            style={{ height: isDarkMode ? "150vh" : "auto" }} // Adjust height for desktop view
          >
            <div className="flex flex-col items-start md:w-2/3">
              <h1
                className={`text-4xl md:text-9xl font-extrabold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                <TypingAnimation
                  className="border-none font-bold md:text-7xl text-black dark:text-white"
                  text=" "
                />
                <GradualSpacing
                  className="font-display text-center text-4xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
                  text={`${adminDetail.username}`}
                />
              </h1>
              <animated.h3
                style={pSpring}
                className={`text-lg md:text-xl font-light ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <p className="p-2 md:p-9 text-justify text-lg font-medium">
                  {adminDetail.bio}
                </p>
              </animated.h3>
            </div>
            <div className="mb-2">
              <animated.div
                style={imgSpring}
                className={`w-40 h-40 md:ml-7 md:w-56 md:h-56 overflow-hidden rounded-full border-4 ${
                  isDarkMode ? "border-gray-600" : "border-gray-300"
                } shadow-lg mb-4 md:mb-0`}
              >
                <img
                  src={adminDetail.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile Pic"
                  className="w-full h-full object-cover"
                />
              </animated.div>
            </div>
          </ShineBorder>
      <button
        onClick={handleOpenPdf}
        className={`mt-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300`}
        aria-label="Open CV"
      >
        Open CV
      </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
