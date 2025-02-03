import {Line} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  zoomPlugin
);

type Props = {
  labels: string[];
  chartData: number[];
  extentionString: string;
};

const CustomChart = ({labels, chartData, extentionString}: Props) => {
  const isDarkMode = document
    .getElementById("root")
    ?.classList.contains("dark");

  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        fill: false,
        borderColor: isDarkMode
          ? "rgba(255, 255, 255, 1)"
          : "rgba(75,192,192,1)",
        backgroundColor: isDarkMode
          ? "rgba(255, 255, 255, 0.4)"
          : "rgba(75,192,192,0.4)",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        display: true,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          padding: 20,
          color: "white",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: number | string) => `${value} ${extentionString}`,
          color: "white",
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: {raw: number | string}) =>
            `${context.raw} ${extentionString}`,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  return (
    <div className="relative w-full h-[400px]">
      <div className="relative w-full h-full overflow-x-auto">
        <div style={{width: `${labels.length * 50}px`, height: "100%"}}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CustomChart;
