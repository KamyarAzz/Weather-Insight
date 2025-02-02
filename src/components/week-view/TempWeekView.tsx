import {TForecastList} from "../../lib/types";
import CustomChartChart from "./ui/CustomChart";
import WeatherView from "./ui/WeatherView";

type Props = {weatherData: TForecastList[]};

export default function TempWeekView({weatherData}: Props) {
  const timeLabels = weatherData.map((data) => {
    const date = new Date(data.dt_txt);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  });

  const temperatures = weatherData.map((data) => Number(data.main.temp));

  const getDateStr = (offset: number = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split("T")[0];
  };

  const getDayShortName = (dateStr: string) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateStr);
    return dayNames[date.getDay()];
  };

  const dates = [getDateStr(0), getDateStr(1), getDateStr(2)];

  const averages = dates.map((date) => {
    const filteredData = weatherData.filter((data) =>
      data.dt_txt.startsWith(date)
    );

    const filteredTemperatures = filteredData.map((data) =>
      Number(data.main.temp)
    );

    const averageTemp =
      filteredTemperatures.length > 0
        ? filteredTemperatures.reduce((sum, h) => sum + h, 0) /
          filteredTemperatures.length
        : 0;

    return {
      day: getDayShortName(date),
      averageTemp: Number(averageTemp.toFixed(2)),
    };
  });

  console.log(weatherData[0]);

  return (
    <div className="flex flex-col items-center gap-4 mt-6 overflow-hidden">
      <h1 className="text-2xl">Tempreture</h1>
      <div className="flex gap-10">
        {averages.map((item) => (
          <WeatherView key={item.day} averages={item} />
        ))}
      </div>
      <CustomChartChart
        labels={timeLabels}
        chartData={temperatures}
        extentionString="°C"
      />
    </div>
  );
}
