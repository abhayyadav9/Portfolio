import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="  mb-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3">
      <div className="container mx-auto px-4">
        {/* Divider */}

        {/* Bottom Section: Credits */}
        <div className="mt-2 text-center e">
          <p className="text-sm">
            &copy; 2024
            <Link to="http://localhost:5173/admin/login" className="hover:decoration-clon"> Abhay Yadav.</Link> All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
