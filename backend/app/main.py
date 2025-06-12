from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import reservation

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ restringir en prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(reservation.router)
