import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selectedProject:null,
  },
  reducers: {
    // action
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedProject = action.payload;

    }
  },
});

export const { setPosts ,setSelectedProject} = projectSlice.actions;
export default projectSlice.reducer;
