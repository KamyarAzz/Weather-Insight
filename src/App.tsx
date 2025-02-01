import {useState, useEffect} from "react";
import WeatherData from "./components/WeatherData";
import {TLocation} from "./lib/types";
import {useOutsideClick} from "./hooks/useOutsideClick";
import Loader from "./components/ui/Loader";
import WeekView from "./components/WeekView";
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
  const [isEditing, setIsEditing] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ref = useOutsideClick(() => setIsEditing(false));

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
      setIsEditing(false);
      getWeatherData(location.city);
    }
  };

  const editClickHnadler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    if (isEditing) setIsEditing(false);
    else setIsEditing(true);
  };

  return loading ? (
    <div className="flex justify-center items-center w-full h-full">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 py-16 w-full h-full text-black">
      <header className="relative flex items-center">
        {!isEditing && location ? (
          <h1 className="min-w-[185px] min-h-[35px] text-2xl text-center">
            {location.country !== "" && `${location.country},`} {location.city}
          </h1>
        ) : (
          <input
            // @ts-ignore
            ref={ref}
            type="text"
            name="city"
            id="search-box"
            placeholder="Choose a city..."
            autoComplete="off"
            className="border-b-2 border-b-purple-900 rounded-tl-[10px] rounded-br-[10px] min-w-[185px] search-box min-h-[35px] text-center text-xl outline-none"
            value={location.city}
            onChange={(e) => changeCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        )}
        <div className="-right-[4.75rem] bottom-2 absolute flex items-center gap-2">
          <svg
            onClick={editClickHnadler}
            className="w-4 h-4 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
          <svg
            onClick={resetCity}
            className="w-4 h-4 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
          </svg>
        </div>
      </header>
      {error ? (
        <p className="text-center text-red-600 text-xl">{error}</p>
      ) : JSON.stringify(location) === JSON.stringify(initialLocation) ? (
        <h1>Please choose a location...</h1>
      ) : (
        weatherData && (
          <>
            <div>
              <h1 className="text-4xl">{weatherData.main.temp} °C</h1>
            </div>
            <main className="w-full h-max">
              <section className="flex justify-center">
                <WeatherData weatherData={weatherData} />
              </section>
              <WeekView city={location.city} />
            </main>
          </>
        )
      )}
    </div>
  );
}

export default App;
