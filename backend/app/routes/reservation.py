from fastapi import APIRouter, Query
from app.services.slots import get_slots, reserve_slot
from app.models.reservation import Reservation

router = APIRouter(prefix="/api")

@router.get("/slots")
def read_slots(restaurant_id: int = Query(...), date: str = Query(...)):
    return get_slots(restaurant_id, date)

@router.post("/reserve")
def reserve(data: Reservation):
    return reserve_slot(data.restaurant_id, data.slot, data.date, data.guests, data.rooms)
