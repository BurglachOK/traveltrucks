import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./carsSlice";
import { filtersReducer } from "./filtersSlice";
import { listSelectedReducer } from "./listSelectedSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: filtersReducer,
    listSelected: listSelectedReducer,
  },
});
