import Cloud from "../../ui/Cloud";

type Props = {
  averages: {day: string; averageTemp: number; mostCommonWeather: string};
  prefrenceUnit: string;
};

export default function WeatherView({averages, prefrenceUnit}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h4 className="text-base">{averages.day}</h4>
      <div className="relative w-10">
        <Cloud className="w-10 h-10" type={averages.mostCommonWeather} />
      </div>
      <p className="text-sm">
        {averages.averageTemp} {prefrenceUnit}
      </p>
    </div>
  );
}
