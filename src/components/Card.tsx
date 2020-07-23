import React from "react";
import { WeatherType } from "../API";

export interface WeatherCardProps {
  date: string;
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
    <div className="w-32 overflow-hidden shadow-lg bg-indigo-900 text-gray-100 text-center p-4">
      <h2>{date}</h2>
      <img src={`/public/img/${image}.png`} alt={weather} />
      <div className="flex justify-around">
        <span className="max-temp">{`${maxTemp}°C`}</span>
        <span className="min-temp">{`${minTemp}°C`}</span>
      </div>
    </div>
  );
};

export default Card;
