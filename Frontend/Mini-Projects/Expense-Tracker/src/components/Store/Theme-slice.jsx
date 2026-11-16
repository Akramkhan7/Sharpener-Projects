import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
    premium: false,
  },
  reducers : {
    activatePremium(state) {
        state.premium = true;
    },
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    },
    
  },
});


export const themeActions = ThemeSlice.actions;
export default ThemeSlice.reducer;