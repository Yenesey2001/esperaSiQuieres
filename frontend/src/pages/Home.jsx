import { useState, useEffect } from "react";
import SlotCard from "../components/SlotCard";

export default function Home() {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/slots")
      .then((res) => res.json())
      .then(setSlots);
  }, []);

  const handleConfirm = () => {
    fetch("http://localhost:8000/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot: selectedSlot }),
    }).then(() => setConfirmed(true));
  };

  if (confirmed) {
    return <div className="container">¡Reserva confirmada para las {selectedSlot}!</div>;
  }

  return (
    <div className="container">
      <h1>Selecciona tu hora para cenar</h1>
      <div className="slots">
        {slots.map((slot) => (
          <SlotCard key={slot.time} slot={slot} selected={selectedSlot === slot.time} onSelect={setSelectedSlot} />
        ))}
      </div>
      <button className="confirm-button" onClick={handleConfirm} disabled={!selectedSlot}>
        Confirmar
      </button>
    </div>
  );
}
