from pydantic import BaseModel

class Reservation(BaseModel):
    restaurant_id: int
    slot: str
