import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    selectProject:null
  },
  reducers: {
    // Action to set the projects
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    // Action to set the single project
    setSelectProject: (state, action) => {
      state.selectProject = action.payload;
    }
  },
});

export const { setProjects,setSelectProject} = projectSlice.actions;
export default projectSlice.reducer;
