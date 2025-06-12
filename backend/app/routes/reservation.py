from fastapi import APIRouter
from app.services.slots import get_slots, reserve_slot

router = APIRouter(prefix="/api")

@router.get("/slots")
def read_slots():
    return get_slots()

@router.post("/reserve")
def reserve(data: dict):
    return reserve_slot(data.get("slot"))
