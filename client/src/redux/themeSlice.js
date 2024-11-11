// src/features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    
  },
});

// Export the actions and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
