import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    adminDetail:null
 
  },
  reducers: {
    // Action to set the authenticated user
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAdminDetail: (state, action) => {
      state.adminDetail = action.payload;
    }
  },
});

// Export the actions and reducer
export const { setAuthUser,setAdminDetail } = authSlice.actions;
export default authSlice.reducer;
