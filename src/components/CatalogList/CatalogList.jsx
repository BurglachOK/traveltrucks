import { useSelector } from "react-redux";
import { selectVisibleCars } from "../../redux/selectors";
import Card from "../Card/Card";

const CatalogList = () => {
  const items = useSelector(selectVisibleCars);
  if (items.length === 0) return <p>The first 4 cars didn't match this filter. Try clicking "Load more" button or changing the filters.</p>;

  return (
    <ul>
      {items.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default CatalogList;
