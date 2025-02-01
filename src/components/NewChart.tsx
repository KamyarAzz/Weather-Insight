import {Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

type Props = {weatherData: any};

export default function NewChart({weatherData}: Props) {
  // Prepare the data for the chart
  const labels = weatherData.map((data: any) => {
    const date = new Date(data.dt_txt);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`; // Format as HH:MM
  });

  const temperatures = weatherData.map((data: any) => Number(data.main.temp)); // Ensure temperatures are numbers

  console.log(labels, temperatures); // Check the values

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weather Temperature Over Time",
      },
    },
  };
  return <Line data={data} options={options} />;
}
