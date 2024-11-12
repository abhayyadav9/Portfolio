import { setAdminDetail } from "@/redux/authSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAdminDetail = () => {
  const dispatch = useDispatch();
//   const adminDetail = useSelector((state) => state.auth.adminDetail);

  useEffect(() => {
    const fetchAdminDetail = async () => {
      try {
        const response = await axios.get(
          "https://abhay-portfolio-orpin.vercel.app/api/v1/admin/public/admindetails"
        );
        console.log(response.data.admin);
        dispatch(setAdminDetail(response.data.admin));
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };
    fetchAdminDetail();
  }, [dispatch]);

//   dispatch(setAdminDetail(adminDetail))
//   return adminDetail;
};

export default useGetAdminDetail;
