import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageState } from "./types";

const initialState: PageState = {
  activePage: "Home",
};

const pageSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<string | null>) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = pageSlice.actions;
export default pageSlice.reducer;
