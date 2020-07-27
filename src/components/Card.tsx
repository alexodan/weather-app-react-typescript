import React from "react";
import { WeatherType } from "../API";

export interface WeatherCardProps {
  date: number;
  weather: WeatherType;
  maxTemp: number;
  minTemp: number;
}

// https://openweathermap.org/find
const Card: React.FC<WeatherCardProps> = (props: WeatherCardProps) => {
  const getWeatherIcon = (weather: WeatherType) => {
    return weather;
  };
  const { date, weather, maxTemp, minTemp } = props;
  const image = getWeatherIcon(weather);

  return (
    <div className="w-40 overflow-hidden shadow-lg bg-indigo-900 text-gray-100 text-center py-4 flex flex-col justify-around">
      <h2>{date}</h2>
      <img
        style={{ height: "140px", width: "140px" }}
        src={`/public/img/${image}.png`}
        alt={weather}
      />
      <div className="flex justify-around">
        <span className="max-temp">{`${maxTemp}°C`}</span>
        <span className="min-temp">{`${minTemp}°C`}</span>
      </div>
    </div>
  );
};

export default Card;
