import React from "react";

import "./Sidebar.css";

export interface SidebarProps {
  todayWeather: string;
  temperature: string;
  condition: string;
  date: string;
  city: string;
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { todayWeather, temperature, condition, date, city } = props;
  return (
    <div className="sidebar text-gray-300 h-screen w-3/12 float-left text-center flex flex-col justify-around items-center relative">
      <button className="bg-gray-700 py-2 px-4 z-10">Search for places</button>
      <img src={`/public/img/${condition}.png`} alt={todayWeather} />
      <div>
        <span className="text-white text-6xl">
          {temperature && Math.round(+temperature)}
        </span>
        <span className="text-gray-400 text-3xl">°C</span>
      </div>
      <h3>{condition}</h3>
      <p>{date}</p>
      <span>{city}</span>
    </div>
  );
};

export default Sidebar;
