import Cloud from "./ui/Cloud";

type Props = {weatherData: any};

export default function WeatherData({weatherData}: Props) {
  // const buildDate = () => {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const daily = new Date();
  //   return `${days[daily.getDay()]} ${daily.getDate()} ${
  //     months[daily.getMonth()]
  //   } ${daily.getFullYear()}`;
  // };

  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-3">
      <Cloud className="w-56" type={weatherData.weather[0].main} />
      <div className="text-gray-600 text-lg">
        Feels like {weatherData.main.feels_like}
      </div>
      <div className="flex items-center gap-10">
        <p>Min: {weatherData.main.temp_min}°C</p>
        <p>Max: {weatherData.main.temp_max}°C</p>
      </div>
    </div>
  );
}
