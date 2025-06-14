from collections import defaultdict
from datetime import datetime

# Estructura: {(rest_id, slot, date): total_guests}
restaurants_slots = defaultdict(int)

MAX_GUESTS_PER_SLOT = 15

LEVEL_THRESHOLDS = {
    "low": 5,
    "medium": 10
}

def get_slots(restaurant_id: int, date: str):
    output = []
    hours = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

    for time in hours:
        key = (restaurant_id, time, date)
        count = restaurants_slots[key]

        if count < LEVEL_THRESHOLDS["low"]:
            level = "low"
        elif count < LEVEL_THRESHOLDS["medium"]:
            level = "medium"
        else:
            level = "high"

        output.append({
            "time": time,
            "level": level,
            "count": count
        })
    return output


def reserve_slot(restaurant_id: int, slot_time: str, date: str, guests: int, rooms: list[int]):
    key = (restaurant_id, slot_time, date)
    current = restaurants_slots[key]

    if current + guests > MAX_GUESTS_PER_SLOT:
        return {
            "status": "error",
            "message": "Slot over capacity"
        }

    restaurants_slots[key] += guests
    return {
        "status": "ok",
        "reserved": slot_time,
        "restaurant_id": restaurant_id,
        "date": date,
        "guests": guests,
        "rooms": rooms
    }
