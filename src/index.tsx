import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import {
  fetchCurrentByCityId,
  CurrentWeatherResponse,
  WeatherType,
  fetchFiveDayForecast,
  ForecastModel,
} from "./API";
import Sidebar from "./components/Sidebar";
import Highlights from "./components/Highlights";
import Forecast from "./components/Forecast";

const styles = {
  backgroundColor: "#100E1D",
};

interface CurrentWeatherInfo {
  temp: string;
  condition: WeatherType;
  visibility: number;
  wind: number;
}

const App: React.FC = () => {
  const [city, setCity] = useState("Buenos Aires");
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState<
    CurrentWeatherInfo
  >();
  const [highlights, setHighlights] = useState<any>([]);
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    fetchCurrentByCityId("3433955").then((data: CurrentWeatherResponse) => {
      const {
        coords,
        weather,
        humidity,
        airPressure,
        visibility,
        wind,
        temp,
      } = data;
      setCurrentWeatherInfo({
        temp: String(temp.current),
        condition: weather,
        visibility,
        wind,
      });
      setHighlights([
        { name: "Wind status", value: wind, unit: "mph" },
        { name: "Humidity", value: humidity, unit: "%" },
        { name: "Visibility", value: visibility, unit: "miles" },
        { name: "Air Pressure", value: airPressure, unit: "mb" },
      ]);
    });
    return () => {};
  }, [city]);

  useEffect(() => {
    fetchFiveDayForecast("3433955").then((forecasts: ForecastModel[]) => {
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
      <main className="flex flex-col items-center justify-center h-screen">
        <Forecast forecasts={forecasts} />
        <Highlights highlights={highlights} />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
