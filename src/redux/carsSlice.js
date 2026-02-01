import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchById, fetchCars } from "./carsOps";

const emptyFilters = () => ({
  location: "",
  bodyType: null,
  equipment: {
    AC: false,
    Automatic: false,
    Kitchen: false,
    TV: false,
    Bathroom: false,
  },
});

const initialState = {
  data: {
    items: [],
    total: 0,
    selectedCar: null,
  },
  loading: false,
  error: null,

  appliedFilters: emptyFilters(),

  isApplied: false,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    applyFilters(state, action) {
      state.appliedFilters = structuredClone(action.payload);
      state.isApplied = true;
    },

    clearAppliedFilters(state) {
      state.appliedFilters = emptyFilters();
      state.isApplied = false;
    },

    clearCars(state) {
      state.data.items = [];
      state.data.total = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        const newItems = Array.isArray(payload) ? payload : (payload.items || []);

        if (state.data.items.length === 0 || action.meta.arg?.page === 1) {
          state.data.items = newItems;
        } else {
          state.data.items = [...state.data.items, ...newItems];
        }

        state.data.total = payload.total ?? state.data.items.length;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error";
      })
      .addCase(fetchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.loading = false;
        state.data.selectedCar = action.payload;
      })
      .addCase(fetchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Error";
      });

  },
});

export const carsReducer = carsSlice.reducer;

export const { applyFilters, clearAppliedFilters, clearCars } = carsSlice.actions;
export const selectCarsLoading = (state) => state.cars.loading;
export const selectCarsError = (state) => state.cars.error;

export const selectItemsArray = (state) => {
  const items = state.cars?.data?.items;
  return Array.isArray(items) ? items : [];
};

export const selectAppliedFilters = (state) => state.cars.appliedFilters;
export const selectIsApplied = (state) => state.cars.isApplied;
export const selectVisibleCars = createSelector(
  [selectItemsArray, selectAppliedFilters],
  (items, filters) => {
    const { location, bodyType, equipment } = filters;
    const q = location.trim().toLowerCase();

    return items.filter((item) => {
      const okLocation = !q
        ? true
        : (item.location || "").toLowerCase().includes(q);
      const itemBodyType = item.form || item.type || item.vehicleType || "";
      const okBodyType = !bodyType
        ? true
        : normalizeType(itemBodyType) === normalizeType(bodyType);

      const activeEq = Object.keys(equipment).filter((k) => equipment[k]);
      const okEquipment =
        activeEq.length === 0 ? true : activeEq.every((k) => matchEquipment(item, k));

      return okLocation && okBodyType && okEquipment;
    });
  }
);

function normalizeType(t) {
  return String(t || "")
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("_", "");
}

function matchEquipment(item, key) {
  switch (key) {
    case "AC":
      return Boolean(item.AC ?? item.ac);
    case "Kitchen":
      return Boolean(item.kitchen);
    case "TV":
      return Boolean(item.TV ?? item.tv);
    case "Bathroom":
      return Boolean(item.bathroom);
    case "Automatic":
      return String(item.transmission || "").toLowerCase() === "automatic";
    default:
      return true;
  }
}

