import {useEffect, useState} from "react";
import Loader from "./ui/Loader";
import WeatherChart from "./WeatherChart";
import HumidityView from "./HumidityView";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

type Props = {city: string};

export default function WeekView({city}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);

  const getWeatherData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherKey}`
      );
      if (!response.ok) {
        setError(true);
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data.list);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="flex justify-center items-center gap-2">
      <svg
        className="w-10 h-10"
        fill="purple"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
      </svg>
      <p className="text-purple-900">Error</p>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 mt-6 w-full">
      <WeatherChart weatherData={weatherData} />
      <HumidityView weatherData={weatherData} />
    </div>
  );
}
