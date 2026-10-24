from pathlib import Path
import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).parent
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","http://house-price-prediction-model-omega.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model1= joblib.load(BASE_DIR / "house_price_model.joblib")

class HousePrice(BaseModel):
    sqft: float
    bedrooms: int
    age_years: float
    distance_to_city_km: float

@app.get("/", response_class=HTMLResponse)
def home():
    return "<h1>Hello from FastAPI!</h1>"

@app.post("/predict")
def predict(house: HousePrice):
    features= pd.DataFrame([[house.sqft, house.bedrooms, house.age_years, house.distance_to_city_km]],
    columns= ["sqft", "bedrooms", "age_years", "distance_to_city_km"]
    )
    price= model1.predict(features)[0]
    return {"predicted_price": round(price)}
