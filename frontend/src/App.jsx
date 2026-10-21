import { useState } from 'react'

const App = () => {
  const [sqft, setSqft] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [ageYears, setAgeYears] = useState("");
  const [distanceToCity, setDistanceToCity] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    const payload={
      sqft: Number(sqft),
      bedrooms: Number(bedrooms),
      age_years: Number(ageYears),
      distance_to_city_km: Number(distanceToCity)
    };
    // this payload works like python library requests, left is key and right is value entered
    console.log("sending to backend:", payload);
  }
  return (
    <div>
      <h1>House Price Prediction</h1>
      <p>Welcome to the House Price Prediction App!</p>
    <form onSubmit={handleSubmit}>
        {/* this means that we will call this function */}
      <div>
        <label htmlFor="sqft">Area(sqft)</label>
        <input type="number" id="sqft" value={sqft} onChange={(e)=>setSqft(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="bedrooms">Bedrooms</label>
        <input type="number" id="bedrooms" value={bedrooms} onChange={(e)=>setBedrooms(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="age_years">Age (years)</label>
        <input type="number" id="age_years" min="0" step="any" value={ageYears} onChange={(e)=>setAgeYears(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="distance_to_city_km">Distance to City (km)</label>
        <input type="number" id="distance_to_city_km" min="0" step="any" value={distanceToCity} onChange={(e)=>setDistanceToCity(e.target.value)}/>
      </div>
      <button type='submit'>Predict Price</button>
    </form>
    </div>
  )
}
export default App