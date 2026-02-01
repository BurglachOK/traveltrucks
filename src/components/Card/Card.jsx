import { useState } from "react";
import css from "./Card.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

import heartGrey from "../../assets/icons/heart_grey.svg";
import heartRed from "../../assets/icons/heart_red.svg";
import starIcon from "../../assets/icons/star.svg";
import mapIcon from "../../assets/icons/map.svg";
import autoIcon from "../../assets/icons/automatic.svg";
import petrolIcon from "../../assets/icons/petrol.svg";
import kitchenIcon from "../../assets/icons/kitchen.svg";
import acIcon from "../../assets/icons/ac.svg";

const Card = ({ data }) => {
  const {
    id,
    name,
    price,
    rating,
    location,
    description,
    transmission,
    engine,
    kitchen,
    AC,
    reviews = [],
    gallery = [],
  } = data;


  const [isFavorite, setIsFavorite] = useState(() => {
    return localStorage.getItem(`fav-${id}`) === "true";
  });

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(`fav-${id}`, newState);
  };

  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={gallery?.[0]?.original}
        alt={name}
        loading="lazy"
      />

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>{name}</h3>
          <div className={css.priceBlock}>
            <span className={css.price}>€{price.toFixed(2)}</span>
            <button
              type="button"
              className={css.favBtn}
              onClick={toggleFavorite}
              aria-label="Add to favorites"
            >
              <img
                src={isFavorite ? heartRed : heartGrey}
                alt="Favorite"
                className={css.heartIcon}
              />
            </button>
          </div>
        </div>

        <div className={css.meta}>
          <div className={css.rating}>
            <img src={starIcon} alt="Rating" className={css.starIcon} />
            <span className={css.ratingText}>
              {rating}({reviews.length} Reviews)
            </span>
          </div>
          <div className={css.location}>
            <img src={mapIcon} alt="Location" className={css.mapIcon} />
            <span>{location}</span>
          </div>
        </div>

        <p className={css.desc}>{description}</p>

        <ul className={css.features}>
          <li className={css.feature}>
            <img src={autoIcon} alt="Transmission" className={css.featureIcon} />
            <span>{transmission}</span>
          </li>
          <li className={css.feature}>
            <img src={petrolIcon} alt="Engine" className={css.featureIcon} />
            <span>{engine}</span>
          </li>
          {kitchen && (
            <li className={css.feature}>
              <img src={kitchenIcon} alt="Kitchen" className={css.featureIcon} />
              <span>Kitchen</span>
            </li>
          )}
          {AC && (
            <li className={css.feature}>
              <img src={acIcon} alt="AC" className={css.featureIcon} />
              <span>AC</span>
            </li>
          )}
        </ul>

        <Link to={`/catalog/${id}`}>
          <Button>Show more</Button>
        </Link>
      </div>
    </li>
  );
};

export default Card;