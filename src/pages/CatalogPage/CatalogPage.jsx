import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/carsOps";
import { selectItemsArray } from "../../redux/carsSlice";
import clsx from "clsx";
import CatalogList from "../../components/CatalogList/CatalogList";
import Filters from "../../components/Filters/Filters";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItemsArray);
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit }));
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchCars({ page: nextPage, limit }));
  };

  const hasMore = items.length > 0 && items.length % limit === 0;

  return (
    <section className={clsx(css.catalogPage)}>
      <Filters />
      <div className={css.listWrapper}>
        <CatalogList />
        {hasMore && (
          <button type="button" className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </section>
  );
};

export default CatalogPage;