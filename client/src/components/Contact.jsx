import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import SendMessage from "./SendMessage";
import { useSelector } from "react-redux";

const Contact = () => {
  const { isDarkMode } = useSelector((store) => store.theme);

  // Apply the theme to the root element based on isDarkMode
  useEffect(() => {
    document.documentElement.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  const cardSpring = useSpring({
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: 50 },
    config: { duration: 800 },
  });

  const iconSpring = useSpring({
    scale: 1,
    from: { scale: 0.8 },
    config: { duration: 600 },
  });

  return (
    <div
      className={`items-center justify-center ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-purple-500 to-indigo-500"
      }`}
    >
      <div className="mt-0">
        <SendMessage />
      </div>
    </div>
  );
};

export default Contact;
