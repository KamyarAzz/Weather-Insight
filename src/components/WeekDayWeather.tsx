import {useEffect, useState} from "react";
import Loader from "./ui/Loader";
import {TKey} from "../lib/types";
import Cloud from "./ui/Cloud";
type Props = {date: Date; city: string; weatherKey: TKey};

export default function WeekDayWeather({date, city, weatherKey}: Props) {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState(true);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getWeatherData = async (city: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${weatherKey.baseURL}?q=${city}&units=metric&date=${formatDate(
          date
        )}&appid=${weatherKey.key}`
      );
      if (!response.ok) {
        setError(true);
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(true);
      console.error("Failed to fetch weather data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(city);
  }, []);

  return (
    <div className="flex flex-col place-items-center gap-2 bg-white bg-opacity-80 shadow-md p-2 rounded-md w-full min-w-24 min-h-40 animate-fadeInUp">
      {loading ? (
        <div className="flex justify-center items-center w-full h-max">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center w-full min-h-full">
          <svg
            className="w-10 h-10"
            fill="purple"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg>
        </div>
      ) : (
        !error &&
        !loading && (
          <>
            <h2>
              {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
            </h2>
            <p>{weatherData.main.temp}°C</p>
            <Cloud className="w-20" type={weatherData.weather[0].main} />
          </>
        )
      )}
    </div>
  );
}
