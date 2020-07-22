import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Card from "./components/Card";
import {
  fetchCurrentByCityId,
  CurrentWeatherResponse,
  WeatherType,
} from "./API";
import Highlight from "./components/Highlight";
import Sidebar from "./components/Sidebar";

const styles = {
  backgroundColor: "#100E1D",
};

interface CurrentWeatherInfo {
  temp: string;
  condition: WeatherType;
}

const App: React.FC = () => {
  const [city, setCity] = useState("Buenos Aires");
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState(
    {} as CurrentWeatherInfo
  );

  useEffect(() => {
    fetchCurrentByCityId("3433955").then((data: CurrentWeatherResponse) => {
      const { weather, temp } = data;
      setCurrentWeatherInfo({
        temp: String(temp.current),
        condition: weather,
      } as CurrentWeatherInfo);
    });
    return () => {};
  }, [city]);

  return (
    <div className="h-screen" style={styles}>
      <Sidebar
        temperature={currentWeatherInfo.temp}
        date={Date.now().toString()}
        city={city}
        todayWeather={currentWeatherInfo.condition}
        condition={currentWeatherInfo.condition}
      />
      <main>
        <div className="flex mb-4">
          <Highlight title="Visibility" value={6.4} unit="miles" />
        </div>
        <div className="flex mb-4">
          <Highlight title="Wind status" value={7} unit="mph" other="WSW" />
        </div>
        <Card date="20-07-19" weather="HeavyCloud" maxTemp={20} minTemp={10} />
      </main>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
