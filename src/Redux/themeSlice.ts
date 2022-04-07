import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../Models/Theme";
import { light } from "../Models/AppThemes";

const initialState = localStorage.getItem("theme");
let initial = light;
if (initialState) {
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
