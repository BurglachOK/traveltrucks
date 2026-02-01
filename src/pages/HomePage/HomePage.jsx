import clsx from "clsx";
import Button from "../../components/Button/Button";
import css from "./HomePage.module.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <section className={clsx(css.hero)}>
      <div className={clsx(css.wrap)}>
        <h1 className={clsx(css.mainText)}>Campers of your dreams</h1>
        <p className={clsx(css.heroDesc)}>
          You can find everything you want in our catalog
        </p>
        <Link to={"/catalog/"}>
          <Button className={clsx(css.heroBtn)}>View New</Button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
