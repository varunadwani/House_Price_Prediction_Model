# House Price Prediction

A full-stack machine learning web app that predicts a house's price from its size, number of bedrooms, age, and distance to the city centre. A linear regression model is trained with scikit-learn, served through a FastAPI backend, and used by a React frontend.

**Live demo:** https://house-price-prediction-model-omega.vercel.app

> The backend runs on a free Render instance that sleeps when idle.

## Features

- Linear regression model trained on a housing dataset (`house_prices.csv`)
- Missing values in `age_years` and `distance_to_city_km` filled with the column median
- REST API built with FastAPI, with automatic interactive docs at `/docs`
- Input validation with Pydantic (wrong types are rejected with a 422 error)
- React form with loading and error states
- CORS configured so the deployed frontend can call the deployed backend

## Tech Stack

| Layer | Tools |
|---|---|
| Model | Python, pandas, scikit-learn, joblib |
| Backend | FastAPI, Uvicorn, Pydantic |
| Frontend | React, Vite |
| Hosting | Render (backend), Vercel (frontend) |

## How It Works

```
React form (Vercel)  --POST /predict-->  FastAPI (Render)  -->  saved model (.joblib)
        ^                                                              |
        +------------------ { "predicted_price": ... } <---------------+
```

1. `model.py` loads the CSV, fills missing values, splits the data 80/20, trains a `LinearRegression` model, prints MAE, RMSE and R², and saves the model to `house_price_model.joblib`.
2. `main.py` loads the saved model once at startup and exposes it through an API.
3. The React app sends the form values as JSON and displays the returned price.

## Model Inputs

| Field | Type | Meaning |
|---|---|---|
| `sqft` | float | Area of the house in square feet |
| `bedrooms` | int | Number of bedrooms |
| `age_years` | float | Age of the house in years |
| `distance_to_city_km` | float | Distance to the city centre in km |

## API

### `GET /`
Returns a simple welcome page.

### `POST /predict`

Request body:

```json
{
  "sqft": 2000,
  "bedrooms": 3,
  "age_years": 10,
  "distance_to_city_km": 5
}
```

Response:

```json
{
  "predicted_price": 123456
}
```

The number above is only an example. Interactive documentation is available at `/docs` on the backend URL.

## Project Structure

```
HousePricePrediction/
├── backend/
│   ├── main.py                  # FastAPI app and /predict endpoint
│   ├── model.py                 # Model training and evaluation script
│   ├── house_prices.csv         # Training data
│   ├── house_price_model.joblib # Saved trained model
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Form, API call, result display
│   │   └── App.css
│   ├── .env.development         # Local API URL
│   ├── .env.production          # Deployed API URL
│   └── package.json
└── README.md
```

## Run Locally

**Requirements:** Python 3.14 (the version used to build the model) and Node.js.

### 1. Clone the repository

```bash
git clone https://github.com/varunadwani/House_Price_Prediction_Model.git
cd House_Price_Prediction_Model
```

### 2. Start the backend

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt
cd backend
python3 -m uvicorn main:app --reload
```

The API runs at http://127.0.0.1:8000 and the docs at http://127.0.0.1:8000/docs.

To retrain the model, run `python3 model.py` inside `backend/`.

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Configuration

| Setting | Where | Purpose |
|---|---|---|
| `VITE_API_URL` | `frontend/.env.development`, `.env.production`, Vercel environment variables | Address of the backend API |
| `allow_origins` | `backend/main.py` | Websites allowed to call the API (CORS) |

If you deploy your own copy, add your frontend's `https://` address to `allow_origins`, exactly as the browser shows it and without a trailing slash.

## Deployment

- **Backend (Render):** root directory `backend`, build command `pip install -r requirements.txt`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`, environment variable `PYTHON_VERSION`.
- **Frontend (Vercel):** root directory `frontend`, framework preset Vite, environment variable `VITE_API_URL` set to the Render URL.

Both services redeploy automatically on every push to `main`.

## Possible Improvements

- Compare other models (random forest, gradient boosting) against linear regression
- Add more features such as location or number of bathrooms
- Show a prediction range instead of a single number
- Add automated tests for the API

## Author

Varun Adwani
