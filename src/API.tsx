// http://api.openweathermap.org/data/2.5/weather?q=buenos%20aires&appid=1234&&lang=es&units=metric
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export type WeatherType =
  | "Clear"
  | "Clouds"
  | "Snow"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Mist"
  | "Smoke"
  | "Haze"
  | "Dust"
  | "Fog"
  | "Sand"
  | "Dust"
  | "Ash"
  | "Squall"
  | "Tornado";

export interface CurrentWeatherResponse {
  coords: { long: number; lat: number };
  weather: WeatherType;
  temp: { current: number; min: number; max: number; humidity: number };
}

export async function fetchCurrentByCityId(
  id: string
): Promise<CurrentWeatherResponse> {
  const res = await fetch(
    `${BASE_URL}?q=${id}&appid=${API_KEY}&lang=es&units=metric`
  );
  const json = await res.json();
  const { coord, weather, main } = json;
  console.log(weather, main);
  return {
    coords: coord,
    weather: weather[0].main,
    temp: {
      current: main.temp,
      min: main.temp_min,
      max: main.temp_max,
      humidity: main.humidity,
    },
  };
}
