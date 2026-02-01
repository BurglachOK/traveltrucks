import clsx from "clsx";
import css from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import Location from "../Location/Location";
import Button from "../Button/Button";

import acIcon from "../../assets/icons/ac.svg";
import autoIcon from "../../assets/icons/automatic.svg";
import kitchenIcon from "../../assets/icons/kitchen.svg";
import tvIcon from "../../assets/icons/tv.svg";
import bathroomIcon from "../../assets/icons/bathroom.svg";
import vanIcon from "../../assets/icons/van.svg";
import fullyIntegratedIcon from "../../assets/icons/fullyIntegrated.svg";
import alcoveIcon from "../../assets/icons/alcove.svg";
import lineIcon from "../../assets/icons/line.svg";

import {
  applyFilters,
  clearAppliedFilters,
  selectIsApplied,
} from "../../redux/carsSlice";

import {
  toggleEquipment,
  setBodyType,
  selectEquipmentFilters,
  selectBodyType,
  clearFilters,
  selectFilters, 
} from "../../redux/filtersSlice";

const Filters = () => {
  const dispatch = useDispatch();

  const equipment = useSelector(selectEquipmentFilters);
  const bodyType = useSelector(selectBodyType);
  const filters = useSelector(selectFilters);
  const isApplied = useSelector(selectIsApplied);

  const handleClick = () => {
    if (!isApplied) {
      dispatch(applyFilters(filters));
      dispatch(clearFilters());
    } else {
      dispatch(clearAppliedFilters());
    }
  };

  return (
    <section className={css.filters}>
      <Location />
      
      <p className={css.filterLabel}>Filters</p>

      <div className={css.filterGroup1}>
        <h3 className={css.title}>Vehicle equipment</h3>
        <img src={lineIcon} alt="Divider" className={css.line} />

        <ul className={css.grid}>
          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.AC && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("AC"))}
            >
              <img src={acIcon} alt="AC" className={css.icon} />
              <span className={css.label}>AC</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Automatic && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Automatic"))}
            >
              <img src={autoIcon} alt="Automatic" className={css.icon} />
              <span className={css.label}>Automatic</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Kitchen && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Kitchen"))}
            >
              <img src={kitchenIcon} alt="Kitchen" className={css.icon} />
              <span className={css.label}>Kitchen</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.TV && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("TV"))}
            >
              <img src={tvIcon} alt="TV" className={css.icon} />
              <span className={css.label}>TV</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Bathroom && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Bathroom"))}
            >
              <img src={bathroomIcon} alt="Bathroom" className={css.icon} />
              <span className={css.label}>Bathroom</span>
            </button>
          </li>
        </ul>
      </div>

      <div className={css.filterGroup2}>
        <h3 className={css.title}>Vehicle type</h3>
        <img src={lineIcon} alt="Divider" className={css.line} />

        <ul className={css.grid}>
          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "Van" && css.itemActive)}
              onClick={() => dispatch(setBodyType("Van"))}
            >
              <img src={vanIcon} alt="Van" className={css.icon} />
              <span className={css.label}>Van</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "FullyIntegrated" && css.itemActive)}
              onClick={() => dispatch(setBodyType("FullyIntegrated"))}
            >
              <img src={fullyIntegratedIcon} alt="Fully Integrated" className={css.icon} />
              <span className={css.label}>Fully Integrated</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "Alcove" && css.itemActive)}
              onClick={() => dispatch(setBodyType("Alcove"))}
            >
              <img src={alcoveIcon} alt="Alcove" className={css.icon} />
              <span className={css.label}>Alcove</span>
            </button>
          </li>
        </ul>
      </div>

      <Button
        className={css.searchBtn}
        onClick={handleClick}
      >
        {isApplied ? "Clear" : "Search"}
      </Button>
    </section>
  );
};

export default Filters;