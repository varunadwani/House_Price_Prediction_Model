from pathlib import Path
import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error

BASE_DIR = Path("__file__").parent
df = pd.read_csv(BASE_DIR / "house_prices.csv")

df["age_years"] = df["age_years"].fillna(df["age_years"].median())
df["distance_to_city_km"] = df["distance_to_city_km"].fillna(df["distance_to_city_km"].median())
# this fills the empty position with the median value of columns as dataframes and this is common
# way of doing it

x= df[["sqft","bedrooms","age_years","distance_to_city_km"]]
y= df["price"]
# gave data frames to x and y

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
model1 = LinearRegression()
model1.fit(x_train, y_train)
# till here training done on 80% of data next comes testing on 20% of data 
predictions= model1.predict(x_test)
# for i in range(8):
#     predicted= predictions[i]
#     actual= y_test.iloc[i]
#     print(f"  Predicted: {predicted:10,.0f}   Actual: {actual:10,.0f}   Off by: {abs(predicted-actual):8,.0f}")

mae= mean_absolute_error(y_test, predictions)
mse= mean_squared_error(y_test, predictions)
rmse= mse**0.5
r2= r2_score(y_test, predictions)
print(f"Mean Absolute Error: {mae:,.0f}")
print(f"RMSE: {rmse:,.0f}")
print(f"R-squared: {r2:,.4f}")

joblib.dump(model1, BASE_DIR / "house_price_model.joblib")