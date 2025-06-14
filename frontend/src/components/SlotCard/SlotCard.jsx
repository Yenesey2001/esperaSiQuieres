// SlotCard.jsx
import styles from "./SlotCard.module.css";

export default function SlotCard({ slot, selected, onSelect }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={() => onSelect(slot.time)}
    >
      <div className={styles.info}>
        <span className={styles.time}>{slot.time}</span>
        <span className={`${styles.badge} ${styles[slot.level]}`}>
          {slot.level === "low" && "Baja ocupación"}
          {slot.level === "medium" && "Media ocupación"}
          {slot.level === "high" && "Alta ocupación"}
        </span>
      </div>
    </div>
  );
}
