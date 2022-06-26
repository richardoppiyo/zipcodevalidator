import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialCityState = { city: "", state: "" };
  const [cityState, setCityState] = useState(initialCityState);
  const [zipcode, setZipcode] = useState("");

  useEffect(() => {
    // Creating a new function named fetchCityState. 
    // We could have this outside the useEffect but this 
    // makes it more readable.
    const fetchCityState = async () => {
      // We are using a try/catch block inside an async function
      // which handles all the promises
      try {
        // Send a fetch request to the getCityState serverless function
        const response = await fetch(
          `https://service.zipapi.us/zipcode/90210/?X-API-KEY=730d97f98a1ee1fe2139a16a610b0af7`,
          { headers: { accept: "application/json" } }
        );
        // We assign data to the response we receive from the fetch
        const data = await response.text();
        console.log(data)
        // Using a spread operator is an easy way to populate our city/state
        // form
        setCityState({...cityState, city: data, state: "" });
        // The catch(e) will console.error any errors we receive
      } catch (e) {
        console.log(e);
      }
    };
    // Run the above function
    fetchCityState();
    //The optional array below will run any time the zipcode
    // field is updated
  }, [zipcode]);
  
  return (
    <div className="App">
      <h1>City/State Lookup Tool</h1>
      <form action="" className="form-data">
        <label htmlFor="zip">Type Zip Code Here</label>
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
        <label htmlFor="city">City</label>
        <input
          className={`city`}
          value={cityState.city}
          type="text"
          name="city"
          disabled
          id="city"
        />
        <label htmlFor="state">State</label>
        <input
          className={`state`}
          value={cityState.state}
          type="text"
          name="state"
          disabled
          id="state"
        />
      </form>
      <pre>
        <code>
          {JSON.stringify({
            zipcode: zipcode,
            city: cityState.city,
            state: cityState.state,
          })}
        </code>
      </pre>
    </div>
  );
}

export default App;

