import {TWeatherData} from "../lib/types";
import Cloud from "./ui/Cloud";

type Props = {weatherData: TWeatherData; prefrenceUnit: string};

export default function WeatherData({weatherData, prefrenceUnit}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-3 mt-3">
      <h1 className="mb-4 text-4xl text-center">
        {weatherData.main.temp} {prefrenceUnit}
      </h1>
      <Cloud className="w-56" type={weatherData.weather[0].main} />
      <div className="mt-2 text-gray-300 text-lg">
        Feels like {weatherData.main.feels_like} {prefrenceUnit}
      </div>
      <div className="flex items-center gap-10 text-base">
        <p>
          Min: {weatherData.main.temp_min} {prefrenceUnit}
        </p>
        <p>
          Max: {weatherData.main.temp_max} {prefrenceUnit}
        </p>
      </div>
    </div>
  );
}
