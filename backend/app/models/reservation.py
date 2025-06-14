from pydantic import BaseModel, Field
from typing import List

class Reservation(BaseModel):
    restaurant_id: int
    slot: str  # hora (ej. "19:00")
    date: str  # formato YYYY-MM-DD
    guests: int = Field(..., gt=0, le=15)
    rooms: List[int] = Field(..., min_items=1)
