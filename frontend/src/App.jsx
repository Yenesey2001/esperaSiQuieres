import { Routes, Route } from "react-router-dom";
import SelectRestaurant from "@/pages/SelectRestaurant/SelectRestaurant";
import Home from "@/pages/Home/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SelectRestaurant />} />
      <Route path="/reserva" element={<Home />} />
    </Routes>
  );
}
