import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { useTheme } from "@/contexts/themeContext"; // Assuming you have a theme context

const SendMessage = () => {
  const { isDarkMode } = useTheme(); // Fetching theme context to toggle between dark and light mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Animation for the contact form
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to the server or display a confirmation message)
    console.log({ name, email, message });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div
      className={`flex flex-col w-fit w-full flex-grow items-center justify-center  p-8 mt-22 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <animated.div style={props}>
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg mb-6 text-center">
          We’d love to hear from you! Please fill out the form below to send us
          a message.
        </p>

        {/* Send Message Form */}
        <section
          className={`contact-section flex flex-col items-center justify-center p-4 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <form
            className={`contact-form w-full max-w-md p-6 rounded shadow-md ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            }`}
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            <input type="hidden" name="access_key" value="your-access-key" />
            <input
              type="hidden"
              name="subject"
              value="New Contact Form Submission from Web3Forms"
            />
            <input type="hidden" name="from_name" value="My Website" />

            <div className="form-group-container mb-2">
              <div className="form-group mb-2">
                <label
                  htmlFor="name"
                  className={`form-label block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className={`form-input border rounded w-full py-2 px-3 ${
                    isDarkMode ? "bg-gray-600 text-white" : "bg-white"
                  }`}
                  placeholder="Your name"
                  type="text"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label
                  htmlFor="email"
                  className={`form-label block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className={`form-input border rounded w-full py-2 px-3 ${
                    isDarkMode ? "bg-gray-600 text-white" : "bg-white"
                  }`}
                  placeholder="Your email"
                  type="email"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label
                  htmlFor="phone"
                  className={`form-label block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className={`form-input border rounded w-full py-2 px-3 ${
                    isDarkMode ? "bg-gray-600 text-white" : "bg-white"
                  }`}
                  placeholder="+1 (234) 56789"
                  type="text"
                  required
                />
              </div>
              <div className="form-group mb-2">
                <label
                  htmlFor="message"
                  className={`form-label block text-sm font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Message
                </label>
                <textarea
                  className={`form-textarea border rounded w-full py-2 px-3 ${
                    isDarkMode ? "bg-gray-600 text-white" : "bg-white"
                  }`}
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>
            </div>
            <button
              className="form-submit bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </section>

        <div className="mt-10">
          {/* Contact Information */}
          <h2 className="text-xl font-bold mb-2">Contact Information</h2>

          <a
            href="mailto:yadavabhay8227.com"
            className="text-purple-600 "
          >
            Email: yadavabhay8227.com
          </a>
          <p className="mb-2"></p>
          <a href="tel:+91 9263833367"  className="text-purple-600 ">
           Phone:  +91 9263833367
          </a>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 justify-between">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook
                className="text-blue-600 hover:text-blue-800 transition"
                size={30}
              />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-blue-400 hover:text-blue-600 transition"
                size={30}
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-pink-500 hover:text-pink-700 transition"
                size={30}
              />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin
                className="text-blue-700 hover:text-blue-900 transition"
                size={30}
              />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub
                size={40}
                className="text-blue-700 hover:text-blue-900 transition"
              />
            </a>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default SendMessage;
