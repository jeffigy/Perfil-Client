import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pageTitle: "Dashboard",
};
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      const { title } = action.payload;
      state.pageTitle = title;
    },
  },
});

export const { setPageTitle } = headerSlice.actions;

export default headerSlice.reducer;
