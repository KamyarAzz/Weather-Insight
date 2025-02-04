import {useState, useEffect} from "react";
import WeatherData from "./components/WeatherData";
import {TLocation, TPreference, TWeatherData} from "./lib/types";
import Loader from "./components/ui/Loader";
import WeekView from "./components/week-view/WeekView";
import LocationHeader from "./components/header/LocationHeader";
import HeaderOptions from "./components/header/HeaderOptions";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
const geoKey = import.meta.env.VITE_GEO_API_KEY;

// Todo:
// 1. change chart color and check mobile
// 2. Add polution, wind and pressure
// 3. Add preview

const initialLocation = {
  city: "",
  country: "",
  inititalCity: "",
  initialCountry: "",
  ip: "",
};

function App() {
  const [location, setLocation] = useState<TLocation>(initialLocation);
  const [prefrence, setPrefrence] = useState<TPreference>({
    type: "metric",
    unit: "°C",
  });
  const [weatherData, setWeatherData] = useState<TWeatherData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getIP();
  }, []);

  const getIP = async () => {
    try {
      const response = await fetch(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${geoKey}`
      );
      if (!response.ok) {
        throw new Error(`Error fetching IP: ${response.statusText}`);
      }
      const data = await response.json();
      setLocation({
        city: data.city,
        country: data.country_name,
        inititalCity: data.city,
        initialCountry: data.country_name,
        ip: data.ip,
      });
      getWeatherData(data.city);
    } catch (error) {
      console.error("Failed to fetch IP:", error);
    }
  };

  const getWeatherData = async (city: string) => {
    if (city) {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${prefrence.type}&appid=${weatherKey}`
        );
        if (!response.ok) {
          setError("Failed to fetch weather data. Please try again later.");
          throw new Error(
            `Error fetching weather data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetCity = () => {
    setLocation((prevLocations) => {
      return {
        ...prevLocations,
        country: location.initialCountry,
        city: location.inititalCity,
      };
    });
    getWeatherData(location.inititalCity);
  };

  const changeCity = (city: string) => {
    setLocation((prevLocations) => {
      return {
        ...prevLocations,
        country: "",
        city: city,
      };
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && location) {
      getWeatherData(location.city);
    }
  };

  useEffect(() => {
    getWeatherData(location.city);
  }, [prefrence]);

  return (
    <div className="flex flex-col items-center gap-4 py-2 md:py-8 w-full h-full text-white overflow-x-hidden overflow-y-auto">
      <header className="flex flex-row justify-between items-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
        <LocationHeader
          getWeatherData={getWeatherData}
          location={location}
          changeCity={changeCity}
          handleKeyPress={handleKeyPress}
          resetCity={resetCity}
        />
        <HeaderOptions prefrence={prefrence} setPrefrence={setPrefrence} />
      </header>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      ) : error ? (
        <p className="mt-5 text-center text-red-600 text-xl">{error}</p>
      ) : !location.city ? (
        <h1>Please choose a location...</h1>
      ) : (
        weatherData && (
          <main className="flex flex-col justify-center gap-8 pb-5 w-max max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
            <WeatherData
              prefrenceUnit={prefrence.unit}
              weatherData={weatherData}
            />
            <WeekView prefrence={prefrence} city={location.city} />
          </main>
        )
      )}
    </div>
  );
}

export default App;
