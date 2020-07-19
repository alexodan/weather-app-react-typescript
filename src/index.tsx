import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Card from "./components/Card";
import { fetchCurrentByCityId, CurrentWeatherResponse } from "./API";

const styles = {
  backgroundColor: "#100E1D",
};

const App: React.FC = () => {
  const [city, setCity] = useState("Buenos Aires");

  useEffect(() => {
    fetchCurrentByCityId("8224").then((data: CurrentWeatherResponse) => {
      console.log(data);
    });
    return () => {};
  }, [city]);

  return (
    <div className="h-screen" style={styles}>
      <h1>Done!</h1>
      <Card date="20-07-19" weather="HeavyCloud" maxTemp={20} minTemp={10} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
