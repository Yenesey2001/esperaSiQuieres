import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlotCard from "@/components/SlotCard/SlotCard";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import "./Home.css";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");

  const navigate = useNavigate();
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    const name = localStorage.getItem("restaurantName");
    setRestaurantName(name || "");

    if (!restaurantId) {
      navigate("/");
      return;
    }

    fetch(`http://localhost:8000/api/slots?restaurant_id=${restaurantId}`)
      .then((res) => res.json())
      .then(setSlots)
      .catch((err) => console.error("Error al obtener slots", err));
  }, [restaurantId, navigate]);

  const handleConfirm = () => {
    if (!selectedSlot || !restaurantId) return;

    fetch("http://localhost:8000/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        restaurant_id: parseInt(restaurantId),
        slot: selectedSlot,
      }),
    }).then(() => setConfirmed(true));
  };

  const handleCloseModal = () => {
    setConfirmed(false);
    setSelectedSlot(null);
    localStorage.removeItem("restaurantId");
    localStorage.removeItem("restaurantName");
    navigate("/");
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h2 className="home-title">Suppertime - {restaurantName}</h2>

        <div className="slots-list">
          {slots.map((slot) => (
            <SlotCard
              key={slot.time}
              slot={slot}
              selected={selectedSlot === slot.time}
              onSelect={setSelectedSlot}
            />
          ))}
        </div>

        <div className="actions">
          <button
            className="change-button"
            onClick={() => {
              localStorage.removeItem("restaurantId");
              localStorage.removeItem("restaurantName");
              navigate("/");
            }}
          >
            Cambiar restaurante
          </button>

          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!selectedSlot}
          >
            Confirmar
          </button>
        </div>
      </div>

      {confirmed && (
        <ConfirmationModal slot={selectedSlot} onClose={handleCloseModal} />
      )}
    </div>
  );
}
