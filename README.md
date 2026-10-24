# House Price Prediction

A full-stack machine learning app that predicts a house price from its area, bedrooms, age and distance to the city.

**Stack:** scikit-learn (Linear Regression) · FastAPI · React (Vite)

## How it works

1. `backend/model.py` trains a Linear Regression model and saves it as `house_price_model.joblib`
2. `backend/main.py` is a FastAPI server that loads the model and exposes `POST /predict`
3. `frontend/` is a React form that sends the inputs to the API and shows the predicted price

| Metric | Value |
|---|---|
| Mean Absolute Error | 15,687 |
| RMSE | 18,921 |
| R² | 0.9625 |

> Note: the model is trained on a small **synthetic** dataset created for learning purposes, so the prices are illustrative, not real market data.

## Project structure

```
HousePricePrediction/
├── backend/
│   ├── main.py                  # FastAPI app
│   ├── model.py                 # training script
│   ├── house_prices.csv         # dataset
│   ├── house_price_model.joblib # trained model
│   └── requirements.txt
└── frontend/                    # React + Vite app
```
