import { Routes, Route, NavLink } from "react-router-dom";
import { Suspense, lazy } from "react";
import clsx from "clsx";
import css from "./Navigation.module.css";
import Logo from "../Logo/Logo"; 

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("../../pages/DetailsPage/Details"));

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active);

return (
  <div className={css.appWrapper}>
    <header className={css.header}>
      <nav className={css.nav}>
        <Logo />
        <div className={css.linksGap}>
          <NavLink to="/" className={buildLinkClass}>Home</NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>Catalog</NavLink>
        </div>
      </nav>
    </header>

    <main className={css.mainContent}>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />} />
        </Routes>
      </Suspense>
    </main>
  </div>
);


};

export default Navigation;