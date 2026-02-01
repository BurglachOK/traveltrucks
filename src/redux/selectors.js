import { createSelector } from "@reduxjs/toolkit";
import { selectAppliedFilters } from "./carsSlice";
export const selectItemsArray = (state) => {
  const items = state.cars?.data?.items;
  return Array.isArray(items) ? items : [];
};

export const selectVisibleCars = createSelector(
  [selectItemsArray, selectAppliedFilters],
  (items, filters) => {
    const { location, bodyType, equipment } = filters;

    const q = location.trim().toLowerCase();

    return items.filter((item) => {
      const okLocation = !q
        ? true
        : (item.location || "").toLowerCase().includes(q);

      const okBodyType = !bodyType
        ? true
        : normalizeType(item.form) === normalizeType(bodyType);

      const activeEq = Object.keys(equipment).filter((k) => equipment[k]);
      const okEquipment =
        activeEq.length === 0 ? true : activeEq.every((k) => matchEquipment(item, k));

      return okLocation && okBodyType && okEquipment;
    });
  }
);

function normalizeType(t) {
  return String(t || "").toLowerCase().replaceAll(" ", "").replaceAll("_", "");
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
