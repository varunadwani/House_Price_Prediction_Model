import { useState } from 'react'
import './App.css'

const App = () => {
  const [sqft, setSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [distanceKm, setDistanceKm] = useState("");
  // here we create variable to store the predicted price
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);                  
  const [error, setError] = useState("");                         

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);                                             
    setError("");                                                 
    setPrice(null);                                             

    const payload = {
      sqft: Number(sqft),
      bedrooms: Number(bedrooms),
      age_years: Number(ageYears),
      distance_to_city_km: Number(distanceKm),
    };
// this payload works like python library requests, left is key and right is value entered
    try {                                                      
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {                                       
        throw new Error("Server error: " + response.status);
      }

      const data = await response.json();
  // here we gave response to backend and it predicts price and sends back in variable data as json format
  // both fetch and response have await as they depend on network and can take time to get response from backend
      setPrice(data.predicted_price);
   // .predicted_price means “give me the value stored under that label.” in backend
    } catch (err) {                                             
      setError("Could not get a prediction. Please check that the backend is running and try again.");
    } finally {                                                  
      setLoading(false);
    }
  }

    return (
    <div className="container">
      <h1>House Price Prediction</h1>
      <p className="subtitle">Enter the house details below to get an estimated price.</p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="sqft">Area (sqft)</label>
          <input type="number" id="sqft" placeholder="e.g. 2000" min="0" step="any" required value={sqft} onChange={(e) => setSqft(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="bedrooms">Bedrooms</label>
          <input type="number" id="bedrooms" placeholder="e.g. 3" min="0" required value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="age_years">Age (years)</label>
          <input type="number" id="age_years" placeholder="e.g. 10" min="0" step="any" required value={ageYears} onChange={(e) => setAgeYears(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="distance_to_city_km">Distance to city (km)</label>
          <input type="number" id="distance_to_city_km" placeholder="e.g. 5" min="0" step="any" required value={distanceKm} onChange={(e) => setDistanceKm(e.target.value)} />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {price !== null && (
        <div className="result">
          <p className="result-label">Estimated price</p>
          <p className="result-value">₹{price.toLocaleString('en-IN')}</p>
        </div>
      )}
    </div>
  )
}

export default App