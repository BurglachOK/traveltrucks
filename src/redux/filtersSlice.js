import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: null,
  equipment: {
    AC: false,
    Automatic: false,
    Kitchen: false,
    TV: false,
    Bathroom: false,
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocationFilter(state, action) {
      state.location = action.payload;
    },

    setBodyType(state, action) {
      const next = action.payload; 
      state.bodyType = state.bodyType === next ? null : next; 
    },

    toggleEquipment(state, action) {
      const key = action.payload; 
      state.equipment[key] = !state.equipment[key];
    },

    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setLocationFilter,
  setBodyType,
  toggleEquipment,
  clearFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
export const selectFilters = (state) => state.filters;

export const selectLocationFilter = (state) => state.filters.location;
export const selectBodyType = (state) => state.filters.bodyType;
export const selectEquipmentFilters = (state) => state.filters.equipment;

