import { useState } from 'react'

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
    <div>
      <h1>House Price Prediction</h1>
      <p>Welcome to the House Price Prediction App!</p>

      <form onSubmit={handleSubmit}>
      {/* this means that we will call this function */}
        <div>
          <label htmlFor="sqft">Area(sqft)</label>
          <input type="number" id="sqft" min="0" step="any" required value={sqft} onChange={(e)=>setSqft(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="bedrooms">Bedrooms</label>
          <input type="number" id="bedrooms" min="0" required value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="age">Age (years)</label>
          <input type="number" id="age" min="0" step="any" required value={ageYears} onChange={(e)=>setAgeYears(e.target.value)}/>
        </div>

        <div>
          <label htmlFor="distance">Distance to city (km)</label>
          <input type="number" id="distance" min="0" step="any" required value={distanceKm} onChange={(e)=>setDistanceKm(e.target.value)}/>
        </div>

        <button type="submit" disabled={loading}>                 {/* NEW */}
          {loading ? "Predicting..." : "Predict Price"}           {/* NEW */}
        </button>
      </form>

      {error && <p className="error">{error}</p>}                 {/* NEW */}
      {price !== null && <h2>Predicted price: {price.toLocaleString()}</h2>}
    </div>
  )
}

export default App