import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialCityState = { city: "", state: "" };
  const [cityState, setCityState] = useState(initialCityState);
  const [zipcode, setZipcode] = useState("");

const GET_API = 'https://service.zipapi.us/zipcode/90210/?X-API-KEY=730d97f98a1ee1fe2139a16a610b0af7';
const fetchDataZips = async (END_POINT) => {
  const data = await fetch(`${GET_API}${END_POINT}`);
  const dataResult = await data.json();
  return dataResult;
};

  useEffect(() => {
  
    const fetchCityState = async () => {
        const data = fetchDataZips
        setCityState({...cityState, city: data, state: "" });
    };
    fetchCityState();
  }, [zipcode]);
  
  return (
    <div className="App">
      <h1>My zip code Validator</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Please Enter upto 5, only digits! </label>
        <input
          className="zip"
          value={zipcode || ""}
          placeholder="XXXXX"
          type="text"
          name="zip"
          id="zip"
          onChange={(event) => {
            const { value } = event.target;
            setZipcode(value.replace(/[^\d{5}]$/, "").substr(0, 5));
          }}
        />
      </form>
        <code>
          {JSON.stringify({
            zipcode: zipcode,
            city: cityState.city,
          })}
        </code>

    </div>
  );
}

export default App;

