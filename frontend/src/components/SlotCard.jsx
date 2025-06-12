export default function SlotCard({ slot, selected, onSelect }) {
  return (
    <div
      className={`slot ${selected ? "selected" : ""}`}
      onClick={() => onSelect(slot.time)}
    >
      <p>{slot.time}</p>
      <p>
        Ocupación: {slot.level === "low" ? "🟢 Baja" : slot.level === "medium" ? "🟡 Media" : "🔴 Alta"}
      </p>
    </div>
  );
}
