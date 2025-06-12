slots = {
    "20:00": 0,
    "20:30": 0,
    "21:00": 0,
    "21:30": 0,
}

def get_slots():
    output = []
    for time, count in slots.items():
        if count < 5:
            level = "low"
        elif count < 10:
            level = "medium"
        else:
            level = "high"
        output.append({"time": time, "level": level})
    return output

def reserve_slot(slot_time):
    if slot_time in slots:
        slots[slot_time] += 1
        return {"status": "ok", "reserved": slot_time}
    return {"status": "error", "message": "Invalid slot"}
