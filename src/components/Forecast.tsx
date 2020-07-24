import React from "react";
import { ForecastModel } from "../API";
import Card from "./Card";

export interface ForecastProps {
  forecasts: ForecastModel[];
}

const Forecast: React.FC<ForecastProps> = ({ forecasts }) => {
  return (
    <div className="flex flex-wrap justify-between max-w-5xl min-w-2/3 w-2/3">
      {forecasts.map(({ date, condition, maxTemp, minTemp }, idx) => (
        <Card
          key={idx}
          date={date}
          weather={condition}
          maxTemp={maxTemp}
          minTemp={minTemp}
        />
      ))}
    </div>
  );
};

export default Forecast;
