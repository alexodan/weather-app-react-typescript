import moment from "moment";

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
  wind: number;
  visibility: number;
  airPressure: number;
  humidity: number;
  temp: { current: number; min: number; max: number };
}

export interface ForecastModel {
  date: number;
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
  const { coord, weather, main, visibility, wind } = json;
  console.log(json);
  return {
    coords: coord,
    weather: weather[0].main,
    visibility,
    wind: wind.speed,
    airPressure: main.pressure,
    humidity: main.humidity,
    temp: {
      current: main.temp,
      min: main.temp_min,
      max: main.temp_max,
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
  const fiveDayForecast = forecastsEachThreeHours
    .sort((f1: ForecastModel, f2: ForecastModel) => f1.date - f2.date)
    .filter((_: ForecastModel, idx: number) => (idx + 1) % 8 === 0)
    .map((forecast: ForecastModel) => ({
      ...forecast,
      date: format(forecast.date),
    }));
  return fiveDayForecast;
}

export function format(timeInMillis: number): string {
  const time = moment.unix(timeInMillis);
  return `${moment.weekdaysShort(
    time.day()
  )}, ${time.date()} ${moment.monthsShort(time.month())}`;
}
