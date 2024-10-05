import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";
import SendMessage from "./SendMessage";

const Contact = () => {
  const [theme, setTheme] = useState("light");

  // Manage theme change
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    <>
      <div
        className={` items-center justify-center  ${
          theme === "light"
            ? "bg-gradient-to-br from-purple-500 to-indigo-500"
            : "bg-gray-900"
        }`}
      >
        <div className="mt-20">
          <SendMessage />
        </div>
      </div>
    </>
  );
};

export default Contact;
