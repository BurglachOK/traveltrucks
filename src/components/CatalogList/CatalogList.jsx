import { useSelector } from "react-redux";
import { selectVisibleCars } from "../../redux/selectors";
import Card from "../Card/Card";

const CatalogList = () => {
  const items = useSelector(selectVisibleCars);
  if (items.length === 0) return <p>Loading...</p>;

  return (
    <ul>
      {items.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default CatalogList;
