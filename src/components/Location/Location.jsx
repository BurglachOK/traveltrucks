import { useDispatch, useSelector } from "react-redux";
import MapIcon from "../../assets/icons/map.svg?react";
import css from "./Location.module.css";
import { setLocationFilter, selectLocationFilter } from "../../redux/filtersSlice";

const Location = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectLocationFilter);

  return (
    <section className={css.location}>
      <h3 className={css.title}>Location</h3>

      <div className={css.inputWrap}>
        <MapIcon className={css.icon} />
        <input
          type="text"
          name="location"
          placeholder="City, country"
          className={css.input}
          value={value}
          onChange={(e) => dispatch(setLocationFilter(e.target.value))}
        />
      </div>
    </section>
  );
};

export default Location;
