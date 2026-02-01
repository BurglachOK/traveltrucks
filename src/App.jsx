import { useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchCars } from "./redux/carsOps";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <>
      <Navigation />
    </>
  );
}

export default App;
