import {useState, useEffect} from "react";
import WeatherData from "./components/WeatherData";
import {TLocation, TWeatherData} from "./lib/types";
import Loader from "./components/ui/Loader";
import WeekView from "./components/week-view/WeekView";
import LocationHeader from "./components/LocationHeader";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
const geoKey = import.meta.env.VITE_GEO_API_KEY;

// https://github.com/rodrigokamada/openweathermap
// polution
// wind and prssure

// Todo:
// 0. Fix the icons of week view
// 1. Fix city search and edit
//    - add search button
//    - change edit button to search
//    - handle search on click outside
//    - fix edit button reopens after closee
//
// 2. change chart color and check mobile
// 3. Add polution
//    - maybe a map
// 4. Add metrics switch button
// 5. make UI presentable
// 6. Add preview

const initialLocation = {
  city: "",
  country: "",
  inititalCity: "",
  initialCountry: "",
  ip: "",
};

function App() {
  const [location, setLocation] = useState<TLocation>(initialLocation);
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
      console.log("weather", data);
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
    <div className="flex flex-col items-center gap-4 py-16 w-full h-full text-black overflow-x-hidden overflow-y-auto">
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
          <main className="flex flex-col justify-center gap-2 w-full max-w-[450px]">
            <div className="bg-white bg-opacity-15 p-5 rounded-md">
              <h1 className="text-4xl text-center">
                {weatherData.main.temp} °C
              </h1>
              <section className="flex justify-center mt-4">
                <WeatherData weatherData={weatherData} />
              </section>
            </div>
            <WeekView city={location.city} />
          </main>
        )
      )}
    </div>
  );
}

export default App;
