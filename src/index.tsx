import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Card from "./components/Card";
import {
  fetchCurrentByCityId,
  CurrentWeatherResponse,
  WeatherType,
  fetchFiveDayForecast,
  Forecast,
} from "./API";
import Sidebar from "./components/Sidebar";
import Highlights from "./components/Highlights";

const styles = {
  backgroundColor: "#100E1D",
};

interface CurrentWeatherInfo {
  temp: string;
  condition: WeatherType;
}

const App: React.FC = () => {
  const [city, setCity] = useState("Buenos Aires");
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState<
    CurrentWeatherInfo
  >();
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    fetchCurrentByCityId("3433955").then((data: CurrentWeatherResponse) => {
      const { weather, temp } = data;
      setCurrentWeatherInfo({
        temp: String(temp.current),
        condition: weather,
      });
    });
    return () => {};
  }, [city]);

  useEffect(() => {
    fetchFiveDayForecast("3433955").then((forecasts: Forecast[]) => {
      setForecasts(forecasts);
    });
    return () => {};
  }, [city]);

  const { temp, condition } = currentWeatherInfo || {};
  return (
    <div className="h-screen" style={styles}>
      <Sidebar
        temperature={temp}
        date={Date.now().toString()}
        city={city}
        todayWeather={condition}
        condition={condition}
      />
      <main>
        <Highlights highlights={[]} />
        <Card date="20-07-19" weather="HeavyCloud" maxTemp={20} minTemp={10} />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
