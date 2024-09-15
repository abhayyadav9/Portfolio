import ShineBorder from "@/components/magicui/shine-border";
import { useSpring, animated } from "@react-spring/web";
import { useTheme } from "../contexts/ThemeContext";
import { BorderBeam } from "./magicui/border-beam";
import TypingAnimation from "./magicui/typing-animation";

const Home = () => {
  const { isDarkMode } = useTheme();

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

  return (
    <div
      className={`mt-20 md:mt-10 flex h-screen  items-center justify-center p-2 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <ShineBorder
        className={`flex flex-col-reverse h-[85vh]  mt-14  md:flex-row gap-8 items-center p-2 w-full max-w-6xl rounded-xl shadow-lg ${
          isDarkMode ? "bg-gray-200" : "bg-gray-50"
        }`}
        style={{ height: isDarkMode ? "70vh" : "auto" }} // Adjust height for desktop view
      >
        <div className="flex flex-col items-start md:w-2/3">
          <animated.h1
            style={h1Spring}
            className={`text-4xl md:text-9xl font-extrabold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <TypingAnimation
              className="border-none font-bold md:text-7xl text-black dark:text-white"
              text=" Hi, I’m Abhay Yadav"
            />
          </animated.h1>
          <animated.h3
            style={pSpring}
            className={`text-lg md:text-xl font-light mt-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            I am a Computer Science Engineering student passionate about
            building innovative solutions. Lorem ipsum dolor sit, amet Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Assumenda lorem
            mollitia, sit sunt reiciendis iste facere maiores ab voluptatum
            harum rerum iure eius et dolorum laudantium dolor distinctio
            consequatur! Minus, nobis placeat in atque
          </animated.h3>
        </div>
        <div>
          <animated.div
            style={imgSpring}
            className={`w-40 h-40 md:w-56 md:h-56 overflow-hidden rounded-full border-4 ${
              isDarkMode ? "border-gray-600" : "border-gray-300"
            } shadow-lg mb-4 md:mb-0`}
          >
            <img
              src="https://th.bing.com/th/id/OIP.9hthnaf3V46DkaiN-UHlTgHaEo?rs=1&pid=ImgDetMain"
              alt="Profile Pic"
              className="w-full h-full object-cover"
            />
          </animated.div>
        </div>
      </ShineBorder>
    </div>
  );
};

export default Home;

// <ShineBorder
//   className="relative flex flex-col md:flex-row md:items-center md:justify-between h-screen w-full p-10 overflow-hidden rounded-lg border bg-background md:shadow-xl"
//   color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
// >
//   {/* Text Section */}
//   <div className="flex flex-col items-start text-left md:w-1/2 md:pr-8 mt-8 md:mt-0">
//     <animated.h1
//       style={h1Spring}
//       className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
//     >
//      
//     </animated.h1>
//     <animated.p
//       style={pSpring}
//       className="text-lg text-gray-600 dark:text-gray-300"
//     >
//       I am a Computer Science Engineering student passionate about building
//       innovative web applications. Welcome to my portfolio!
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur quasi qui culpa ab eveniet? Aut at nisi deleniti fuga maiores, non, hic ex asperiores repudiandae, quibusdam explicabo veniam cupiditate rerum corporis laborum quia quam saepe? Aliquid facere ex tenetur vel nostrum optio earum nam amet!
//     </animated.p>
//   </div>

//   {/* Photo Section */}
//   <div className="flex justify-center items-center md:w-1/2">
//     <animated.div
//       style={imgSpring}
//       className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg"
//     >
//       <img
//         src="your-photo-url.jpg" // Replace with your photo URL
//         alt="Abhay Yadav"
//         className="object-cover w-full h-full"
//       />
//     </animated.div>
//   </div>
// </ShineBorder>
