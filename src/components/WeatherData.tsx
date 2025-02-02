import {TWeatherData} from "../lib/types";
import Cloud from "./ui/Cloud";

type Props = {weatherData: TWeatherData};

export default function WeatherData({weatherData}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-3">
      <Cloud className="w-56" type={weatherData.weather[0].main} />
      <div className="mt-2 text-gray-600 text-lg">
        Feels like {weatherData.main.feels_like}
      </div>
      <div className="flex items-center gap-10 text-base">
        <p>Min: {weatherData.main.temp_min}°C</p>
        <p>Max: {weatherData.main.temp_max}°C</p>
      </div>
    </div>
  );
}
