import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Project from "./components/Project";
import AdminHome from "./components/admin/AdminHome";
import { Login } from "./components/admin/Login";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <div>{!isAdminRoute && <Navbar />}</div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project" element={<Project />} />
          <Route path="/view-project" element={<ProjectDetail />} />

          <Route path="/admin/home/*" element={<AdminHome />} />
          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
