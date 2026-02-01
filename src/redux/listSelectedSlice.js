import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};
export const listSelectedSlice = createSlice({
  name: "listSelected",
  initialState,
  reducers: {},
});

export const listSelectedReducer = listSelectedSlice.reducer;
