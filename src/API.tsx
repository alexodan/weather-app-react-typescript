// http://api.openweathermap.org/data/2.5/weather?q=buenos%20aires&appid=1234&&lang=es&units=metric
const WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export type WeatherType =
  | "Clear"
  | "Clouds"
  | "HeavyCloud"
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

export interface ForecastModel {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: WeatherType;
}

export async function fetchCurrentByCityId(
  id: string
): Promise<CurrentWeatherResponse> {
  const res = await fetch(
    `${WEATHER_URL}?id=${id}&appid=${API_KEY}&lang=es&units=metric`
  );
  const json = await res.json();
  const { coord, weather, main } = json;
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

export async function fetchFiveDayForecast(
  id: string
): Promise<ForecastModel[]> {
  const res = await fetch(
    `${FORECAST_URL}/?id=${id}&appid=${API_KEY}&units=metric`
  );
  const json = await res.json();
  const { list } = json;
  return aggregateForecastByDay(list);
}

// TODO strong typing
function aggregateForecastByDay(forecastApiData: any): ForecastModel[] {
  const forecastsEachThreeHours = forecastApiData.map(
    ({ dt, main, weather }: any) => ({
      date: dt,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
      condition: weather[0].main as WeatherType,
    })
  );
  return forecastsEachThreeHours;
  // return forecastsEachThreeHours.slice(1).reduce((aggregatedForecasts, forecast, idx) => {
  //   const currentDate = forecast.date;
  //   const nextDate = forecastsEachThreeHours[idx + 1];
  //   if (isSameDay(currentDate, nextDate)) {

  //   }
  // }, []);
}

function isSameDay(date1: number, date2: number): boolean {
  return false;
}
