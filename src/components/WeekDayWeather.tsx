import Cloud from "./ui/Cloud";
type Props = {date: Date; weatherData: any};

export default function WeekDayWeather({date, weatherData}: Props) {
  return (
    <div className="flex flex-col place-items-center gap-2 bg-white bg-opacity-75 shadow-md p-2 rounded-md min-w-24 min-h-40 animate-fadeInUp">
      <h2>
        {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
      </h2>
      <p>{weatherData.main.temp}</p>
      <Cloud className="w-20" type={weatherData.weather[0].main} />
    </div>
  );
}
