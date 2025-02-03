import {useEffect, useState} from "react";
import Loader from "../ui/Loader";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
import HumidityWeekView from "./HumidityWeekView";
import TempWeekView from "./TempWeekView";
import {TForecastList, TPreference} from "../../lib/types";

type Props = {city: string; prefrence: TPreference};

export default function WeekView({city, prefrence}: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState<TForecastList[]>();

  const getWeatherData = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${prefrence.type}&appid=${weatherKey}`
      );
      if (!response.ok) {
        setError(true);
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data.list);
      console.log("forecast", data);
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
    <div className="flex justify-center items-center mt-10 w-full">
      <Loader />
    </div>
  ) : error || !weatherData ? (
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
    <section className="flex flex-col gap-10 w-full">
      <div
        className="flex flex-start bg-white bg-opacity-15 mt-4 p-5 rounded-[20px] w-full"
        style={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <TempWeekView
          prefrenceUnit={prefrence.unit}
          weatherData={weatherData}
        />
      </div>
      <div
        className="flex flex-start bg-white bg-opacity-15 mt-2 p-5 rounded-[20px] w-full"
        style={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)",
        }}
      >
        <HumidityWeekView weatherData={weatherData} />
      </div>
    </section>
  );
}
