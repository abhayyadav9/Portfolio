import Footer from "./Footer";
import useGetAdminDetail from "./hooks/useGetAdminDetail";
import useGetAllProject from "./hooks/useGetAllProject";
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
