import {Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

type Props = {
  weatherData: any; // Adjust the type according to your data structure
};

const WeatherChart = ({weatherData}: Props) => {
  // Prepare the data for the chart
  const labels = weatherData.map((data: any) => {
    const date = new Date(data.dt_txt);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`; // Format as HH:MM
  });

  const temperatures = weatherData.map((data: any) => Number(data.main.temp)); // Ensure temperatures are numbers

  const data = {
    labels: labels, // X-axis labels
    datasets: [
      {
        label: "Temperature (°C)", // Label for the dataset
        data: temperatures, // Y-axis data
        fill: false, // No fill under the line
        borderColor: "rgba(75,192,192,1)", // Line color
        backgroundColor: "rgba(75,192,192,0.4)", // Point color
        tension: 0.3, // Smooth curve
        pointRadius: 4, // Size of points
        pointHoverRadius: 6, // Size of points on hover
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: true,
    scroll: true,
    scales: {
      y: {
        beginAtZero: false, // Start Y-axis from the minimum value
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <Line className="" data={data} options={options} />
    </div>
  );
};

export default WeatherChart;
