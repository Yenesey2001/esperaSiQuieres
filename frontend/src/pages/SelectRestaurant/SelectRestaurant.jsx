import { useNavigate } from "react-router-dom";
import styles from "./SelectRestaurant.module.css";

const restaurants = [
  { id: 1, name: "Restaurante 1", image: "restaurante1.jpg" },
  { id: 2, name: "Restaurante 2", image: "restaurante2.jpg" },
  { id: 3, name: "Restaurante 3", image: "restaurante3.jpg" },
];

export default function SelectRestaurant() {
  const navigate = useNavigate();

  const handleSelect = (id, name) => {
    localStorage.setItem("restaurantId", id);
    localStorage.setItem("restaurantName", name);
    navigate("/reserva");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Select the restaurant</h2>
        <div className={styles.list}>
          {restaurants.map((r) => (
            <button
              key={r.id}
              className={styles.card}
              onClick={() => handleSelect(r.id, r.name)}
              style={{
                backgroundImage: `url(/src/assets/img/${r.image})`,
              }}
            >
              <div className={styles.overlay}>
                <span className={styles.name}>{r.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
