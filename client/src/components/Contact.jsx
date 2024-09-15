import { useSpring, animated } from '@react-spring/web';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const cardSpring = useSpring({ opacity: 1, y: 0, from: { opacity: 0, y: 50 }, config: { duration: 800 } });
  const iconSpring = useSpring({ scale: 1, from: { scale: 0.8 }, config: { duration: 600 } });

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center">Get in Touch</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* Email Card */}
        <animated.div style={cardSpring} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <animated.div style={iconSpring} className="text-purple-600">
            <FaEnvelope size={40} />
          </animated.div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Email</h2>
            <p className="text-gray-600">abhay@example.com</p>
          </div>
        </animated.div>

        {/* Phone Card */}
        <animated.div style={cardSpring} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <animated.div style={iconSpring} className="text-purple-600">
            <FaPhone size={40} />
          </animated.div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Phone</h2>
            <p className="text-gray-600">+91 123 456 7890</p>
          </div>
        </animated.div>

        {/* LinkedIn Card */}
        <animated.div style={cardSpring} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <animated.div style={iconSpring} className="text-purple-600">
            <FaLinkedin size={40} />
          </animated.div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">LinkedIn</h2>
            <a href="https://www.linkedin.com/in/abhay-yadav" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              linkedin.com/in/abhay-yadav
            </a>
          </div>
        </animated.div>

        {/* GitHub Card */}
        <animated.div style={cardSpring} className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-6 transform hover:scale-105 transition-transform duration-300">
          <animated.div style={iconSpring} className="text-purple-600">
            <FaGithub size={40} />
          </animated.div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">GitHub</h2>
            <a href="https://github.com/abhay" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">
              github.com/abhay
            </a>
          </div>
        </animated.div>

      </div>
    </div>
    
    </>

  
  );
};

export default Contact;
