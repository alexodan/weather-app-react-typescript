import React from "react";

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
    <div className="text-gray-100 h-screen w-3/12 float-left">
      <button>Search for places</button>
      <img src={todayWeather} alt={todayWeather} />
      <h2>{temperature}</h2>
      <h3>{condition}</h3>
      <p>{date}</p>
      <span>{city}</span>
    </div>
  );
};

export default Sidebar;
