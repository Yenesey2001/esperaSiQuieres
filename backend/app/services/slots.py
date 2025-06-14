# app/services/slots.py

# Simulación de base de datos en memoria
restaurants_slots = {
    r_id: {
        "18:00": 0,
        "18:30": 0,
        "19:00": 0,
        "19:30": 0,
        "20:00": 0,
        "20:30": 0,
        "21:00": 0,
        "21:30": 0,
    }
    for r_id in range(1, 4)
}

# Umbrales para determinar nivel de ocupación
LEVEL_THRESHOLDS = {
    "low": 5,
    "medium": 10
}


def get_slots(restaurant_id: int):
    """
    Devuelve los slots del restaurante con nivel de ocupación.
    """
    if restaurant_id not in restaurants_slots:
        return []

    output = []
    for time, count in restaurants_slots[restaurant_id].items():
        if count < LEVEL_THRESHOLDS["low"]:
            level = "low"
        elif count < LEVEL_THRESHOLDS["medium"]:
            level = "medium"
        else:
            level = "high"

        output.append({
            "time": time,
            "level": level,
            "count": count  # Útil si quieres mostrar nº de reservas
        })
    return output


def reserve_slot(restaurant_id: int, slot_time: str):
    """
    Aumenta en 1 la reserva del slot correspondiente.
    """
    if restaurant_id in restaurants_slots and slot_time in restaurants_slots[restaurant_id]:
        restaurants_slots[restaurant_id][slot_time] += 1
        return {
            "status": "ok",
            "reserved": slot_time,
            "restaurant_id": restaurant_id
        }

    return {
        "status": "error",
        "message": "Invalid slot or restaurant"
    }
