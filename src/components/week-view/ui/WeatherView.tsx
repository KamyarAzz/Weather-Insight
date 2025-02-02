import Cloud from "../../ui/Cloud";

type Props = {averages: {day: string; averageTemp: number}};

export default function WeatherView({averages}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h4 className="text-base">{averages.day}</h4>
      <div className="relative w-10">
        <Cloud type="" />
      </div>
      <p className="text-sm">{averages.averageTemp}%</p>
    </div>
  );
}
