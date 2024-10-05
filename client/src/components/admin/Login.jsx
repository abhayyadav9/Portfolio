import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      setLoading(true);
      const res = await axios.post(
        "https://abhay-portfolio-ky57.vercel.app/api/v1/admin/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/admin/home"); // Navigate to the admin home page or any other relevant page
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Login failed. Please check your email and password."); // Display error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for any conditions or cleanup if needed
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-80"
        onSubmit={loginHandler}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error messages */}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 focus:ring-pink-500 focus:border-pink-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            placeholder="Password"
            value={input.password}
            name="password"
            required
            onChange={changeEventHandler}
          />
        </div>

        {loading ? (
          <button
            type="button"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600"
            disabled
          >
            Please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
};
