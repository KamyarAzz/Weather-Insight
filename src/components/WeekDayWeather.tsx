import Cloud from "./ui/Cloud";
type Props = {date: Date; weatherData: any};

export default function WeekDayWeather({date, weatherData}: Props) {
export default function WeekDayWeather({date, city, weatherKey}: Props) {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState(true);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getWeatherData = async (city: string) => {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${weatherKey.baseURL}?q=${city}&units=metric&date=${formatDate(
          date
        )}&appid=${weatherKey.key}`
      );
      if (!response.ok) {
        setError(true);
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(true);
      console.error("Failed to fetch weather data:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeatherData(city);
  }, []);

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
