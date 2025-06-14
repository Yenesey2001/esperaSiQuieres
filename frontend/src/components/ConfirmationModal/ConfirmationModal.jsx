// ConfirmationModal.jsx
import styles from "./ConfirmationModal.module.css";

export default function ConfirmationModal({ slot, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✅ ¡Reserva confirmada!</h2>
        <p>Te esperamos a las <strong>{slot}</strong>.</p>
        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
