export type TLocation = {
  inititalCity: string;
  initialCountry: string;
  city: string;
  country: string;
  ip: string;
};

export type TWeatherData = {
  base: string;
  clouds: {all: number};
  cod: string;
  coord: {lon: number; lat: number};
  dt: number;
  id: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: TWeatherItem[];
  wind: {speed: number; deg: number};
};

type TWeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type TForecastData = {
  city: {
    coord: {lat: number; lon: number};
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  list: TForecastList[];
  message: number;
};

export type TForecastList = {
  clouds: {all: number};
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
  pop: number;
  sys: {pod: string};
  visibility: number;
  weather: TForecastItem[];
  wind: {speed: number; deg: number; gust: number};
};

type TForecastItem = {
  description: string;
  icon: string;
  id: number;
  main: string;
};
