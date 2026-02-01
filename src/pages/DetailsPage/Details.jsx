import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchById } from "../../redux/carsOps";
import toast, { Toaster } from "react-hot-toast";
import clsx from "clsx";
import css from "./Details.module.css";

import KitchenIcon from "../../assets/icons/kitchen.svg";
import AutoIcon from "../../assets/icons/automatic.svg";
import PetrolIcon from "../../assets/icons/petrol.svg";
import AcIcon from "../../assets/icons/ac.svg";
import StarIcon from "../../assets/icons/star.svg";
import MapIcon from "../../assets/icons/map.svg";
import BathroomIcon from "../../assets/icons/bathroom.svg";
import RadioIcon from "../../assets/icons/radio.svg";
import RefrigeratorIcon from "../../assets/icons/refrigerator.svg";
import MicrowaveIcon from "../../assets/icons/microwave.svg";
import WaterIcon from "../../assets/icons/water.svg";
import GasIcon from "../../assets/icons/gas.svg";
import TvIcon from "../../assets/icons/tv.svg";

const selectSelectedCar = (state) => state.cars.data.selectedCar;

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("features");
  const [dateValue, setDateValue] = useState("");
  const [setIsDateFocused] = useState(false);

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  const car = useSelector(selectSelectedCar);

  if (!car) return null;

  const {
    name, price, rating, location, description, gallery, reviews,
    form, length, width, height, tank, consumption,
    transmission, engine, AC, kitchen, bathroom, TV, radio, refrigerator, microwave, gas, water
  } = car;

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
  }).format(price);

  const getFormattedDate = () => {
    if (!dateValue) return "";
    const [year, month, day] = dateValue.split("-");
    return `${day}.${month}.${year}`;
  };

  const vehicleDetails = [
    ["Form", form], ["Length", length], ["Width", width],
    ["Height", height], ["Tank", tank], ["Consumption", consumption],
  ];

  const featuresList = [
    { label: transmission, icon: <img src={AutoIcon} alt="transmission" />, show: true },
    { label: engine, icon: <img src={PetrolIcon} alt="engine" />, show: true },
    { label: "AC", icon: <img src={AcIcon} alt="AC" />, show: AC },
    { label: "Kitchen", icon: <img src={KitchenIcon} alt="kitchen" />, show: kitchen },
    { label: "Bathroom", icon: <img src={BathroomIcon} alt="bathroom" />, show: bathroom },
    { label: "TV", icon: <img src={TvIcon} alt="TV" />, show: TV },
    { label: "Radio", icon: <img src={RadioIcon} alt="radio" />, show: radio },
    { label: "Refrigerator", icon: <img src={RefrigeratorIcon} alt="refrigerator" />, show: refrigerator },
    { label: "Microwave", icon: <img src={MicrowaveIcon} alt="microwave" />, show: microwave },
    { label: "Gas", icon: <img src={GasIcon} alt="gas" />, show: gas },
    { label: "Water", icon: <img src={WaterIcon} alt="water" />, show: water },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully booked!");
    e.currentTarget.reset();
    setDateValue("");
  };

  return (
    <section className={css.page}>
      <Toaster />
      <div className={css.container}>
        <header className={css.header}>
          <h1 className={css.title}>{name}</h1>
          <div className={css.metaRow}>
            <div className={css.rating}>
              <img src={StarIcon} className={css.starIconActive} alt="star" />
              <span className={css.ratingText}>{rating} ({reviews?.length} Reviews)</span>
            </div>
            <div className={css.location}>
              <img src={MapIcon} className={css.iconMap} alt="map" />
              <span>{location}</span>
            </div>
          </div>
          <p className={css.price}>€{formattedPrice}</p>
        </header>

        <ul className={css.gallery}>
          {gallery?.map((img, index) => (
            <li key={index} className={css.photoWrap}>
              <img src={img.original} alt={name} className={css.image} />
            </li>
          ))}
        </ul>

        <p className={css.description}>{description}</p>

        <div className={css.tabs}>
          <button type="button" className={clsx(css.tabBtn, activeTab === "features" && css.active)} onClick={() => setActiveTab("features")}>Features</button>
          <button type="button" className={clsx(css.tabBtn, activeTab === "reviews" && css.active)} onClick={() => setActiveTab("reviews")}>Reviews</button>
        </div>

        <div className={css.mainContent}>
          <div className={css.leftCol}>
            {activeTab === "features" ? (
              <div className={css.featuresContent}>
                <ul className={css.tags}>
                  {featuresList.map((item, index) => item.show && (
                    <li key={index} className={css.tag}>{item.icon}<span>{item.label}</span></li>
                  ))}
                </ul>
                <h2 className={css.blockTitle}>Vehicle details</h2>
                <div className={css.divider} />
                <ul className={css.details}>
                  {vehicleDetails.map(([label, value]) => (
                    <li key={label} className={css.detailRow}><span>{label}</span><span>{value}</span></li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={css.reviewsContent}>
                <ul className={css.reviewsList}>
                  {reviews?.map((rev, idx) => (
                    <li key={idx} className={css.reviewItem}>
                      <div className={css.reviewerHeader}>
                        <div className={css.avatar}>{rev.reviewer_name[0]}</div>
                        <div className={css.reviewerMeta}>
                          <p className={css.reviewerName}>{rev.reviewer_name}</p>
                          <div className={css.starsRow}>
                            {[...Array(5)].map((_, i) => (
                              <img key={i} src={StarIcon} className={clsx(css.reviewStar, i < rev.reviewer_rating ? css.starFilled : css.starEmpty)} alt="star" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className={css.reviewComment}>{rev.comment}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className={css.rightCard}>
            <h2 className={css.formTitle}>Book your campervan now</h2>
            <p className={css.formSubtitle}>Stay connected! We are always ready to help you.</p>
            <form className={css.form} onSubmit={handleSubmit}>
              <input className={css.input} type="text" placeholder="Name*" required />
              <input className={css.input} type="email" placeholder="Email*" required />
              <div className={css.dateInputContainer}>
                <input
                  className={css.input}
                  type= "date"
                  placeholder="Booking date*"
                  value={getFormattedDate(dateValue)}
                  onChange={(e) => setDateValue(e.target.value)}
                  onFocus={() => setIsDateFocused(true)}
                  onBlur={() => setIsDateFocused(false)}
                  required
                />
              </div>
              <textarea className={css.textarea} placeholder="Comment" rows={4} />
              <button className={css.submit} type="submit">Send</button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;