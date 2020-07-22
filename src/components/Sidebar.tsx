import React from "react";

export interface SidebarProps {
  todayWeather: string;
  temperature: string;
  condition: string;
  date: string;
  city: string;
}

const styles = {
  backgroundImage: "url('/public/img/Cloud-background.png')",
  backgroundPosition: "center 100px",
  opacity: 0.3,
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const { todayWeather, temperature, condition, date, city } = props;
  return (
    <div className="text-gray-300 h-screen w-3/12 float-left text-center flex flex-col justify-around items-center relative">
      <div
        style={styles}
        className="bg-opacity-25 bg-no-repeat absolute inset-0"
      ></div>
      <button className="bg-gray-700 py-2 px-4">Search for places</button>
      <img src={`/public/img/HeavyRain.png`} alt={todayWeather} />
      <div>
        <span className="text-white text-6xl">{temperature}</span>
        <span className="text-gray-400 text-3xl">°C</span>
      </div>
      <h3>{condition}</h3>
      <p>{date}</p>
      <span>{city}</span>
    </div>
  );
};

export default Sidebar;
