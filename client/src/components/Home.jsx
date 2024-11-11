import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import useGetAdminDetail from "./hooks/useGetAdminDetail";
import useGetAllProject from "./hooks/useGetAllProject";
import Navbar from "./Navbar";
import Profile from "./Profile";

const Home = () => {
  useGetAllProject();
  useGetAdminDetail();
 

  return (
  
     <div>

      <Profile/>
      <Footer/>

     </div>
  
  );
};

export default Home;
