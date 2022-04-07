import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Game {
  name: string;
  links: string[];
}

const gamesToDownload: Game[] = [];

export const downloadSlice = createSlice({
  name: "downloads",
  initialState: {
    gamesToDownload: gamesToDownload,
  },
  reducers: {
    addDownload: (state, action: PayloadAction<Game>) => {
      state.gamesToDownload.push(action.payload);
    },
  },
});

export const { addDownload } = downloadSlice.actions;

export default downloadSlice.reducer;

/*
      {
        name: "7 days to die",
        links: [
          "https://www.mediafire.com/file/mdh699yze0f2ara/7.Days.to.Die.A20.B238.7z/file",
        ],
      }
*/
