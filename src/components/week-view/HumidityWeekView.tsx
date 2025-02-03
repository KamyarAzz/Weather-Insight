import {TForecastList} from "../../lib/types";
import HumidityView from "./ui/HumidityView";
import CustomChartChart from "./ui/CustomChart";

type Props = {weatherData: TForecastList[]};

export default function HumidityWeekView({weatherData}: Props) {
  const timeLabels = weatherData.map((data) => {
    const date = new Date(data.dt_txt);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  });

  const humidity = weatherData.map((data) => Number(data.main.humidity));

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

    const humidities = filteredData.map((data) => Number(data.main.humidity));

    const averageHumidity =
      humidities.length > 0
        ? humidities.reduce((sum, h) => sum + h, 0) / humidities.length
        : 0;

    return {
      day: getDayShortName(date),
      averageHumidity: Number(averageHumidity.toFixed(2)),
    };
  });

  return (
    <div className="flex flex-col items-center gap-4 mt-6 overflow-hidden">
      <h1 className="text-2xl">Humidity Forecast</h1>
      <div className="flex gap-12 mt-4">
        {averages.map((item) => (
          <HumidityView key={item.day} averages={item} />
        ))}
      </div>
      <CustomChartChart
        labels={timeLabels}
        chartData={humidity}
        extentionString="%"
      />
    </div>
  );
}
