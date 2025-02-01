import {useState, useEffect} from "react";
import WeatherData from "./components/WeatherData";
import {TLocation} from "./lib/types";
import Loader from "./components/ui/Loader";
import WeekView from "./components/WeekView";
import LocationHeader from "./components/LocationHeader";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
const geoKey = import.meta.env.VITE_GEO_API_KEY;

// 2 chart for temp and humidity
// 2 dailys (3 days) inside one containers (temp & humid)
// polution

// Todo:
// 1. Fix city search and edit
//    - add search button
//    - change edit button to search
//    - handle search on click outside
//    - fix edit button reopens after closee
//
// 2. Add chart
// 3. Add humidity
//    - daily get (average of each day)
//    - backgroudn water getting filled
// 4. Add polution
//    - maybe a map
// 5. Add metrics

const initialLocation = {
  city: "",
  country: "",
  inititalCity: "",
  initialCountry: "",
  ip: "",
};

function App() {
  const [location, setLocation] = useState<TLocation>(initialLocation);
  const [weatherData, setWeatherData] = useState<any>(null);
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
        setError("Failed to fetch IP address. Please try again later.");
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
      setError("Failed to fetch IP address. Please try again later.");
    }
  };

  const getWeatherData = async (city: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherKey}`
      );
      if (!response.ok) {
        setError("Failed to fetch weather data. Please try again later.");
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
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
  };

  const changeCity = (city: string) => {
    setError("");
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

  return loading ? (
    <div className="flex justify-center items-center w-full h-full">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 py-16 w-full h-full text-black">
      <LocationHeader
        location={location}
        changeCity={changeCity}
        handleKeyPress={handleKeyPress}
        resetCity={resetCity}
      />
      {error ? (
        <p className="text-center text-red-600 text-xl">{error}</p>
      ) : JSON.stringify(location) === JSON.stringify(initialLocation) ? (
        <h1>Please choose a location...</h1>
      ) : (
        weatherData && (
          <main className="flex flex-col justify-center gap-2 w-full max-w-[450px] overflow-y-auto">
            <div className="bg-white bg-opacity-15 p-5 rounded-md">
              <h1 className="text-4xl text-center">
                {weatherData.main.temp} °C
              </h1>
              <section className="flex justify-center mt-4">
                <WeatherData weatherData={weatherData} />
              </section>
            </div>
            <section className="flex flex-start bg-white bg-opacity-15 mt-4 p-5 rounded-md w-full overflow-x-auto">
              <WeekView city={location.city} />
            </section>
          </main>
        )
      )}
    </div>
  );
}

export default App;
