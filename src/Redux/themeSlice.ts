import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themes } from "../Models/AppThemes";
import { Theme } from "../Models/Theme";

const initialState = localStorage.getItem("theme");
let initial = themes[1]; // light
if (initialState != null) {
  initial = JSON.parse(initialState);
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: initial,
  },
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(action.payload));
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
