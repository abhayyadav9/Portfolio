import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
 
  },
  reducers: {
    // Action to set the authenticated user
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setAuthUser } = authSlice.actions;
export default authSlice.reducer;
