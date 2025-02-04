# Weather-Insight

Weather Insight is a modern weather application built with React. It provides users with real-time weather data, forecasts, and insights for any location around the globe.

[Preview](https://weatherly-insight.netlify.app/)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Weather Data**: Get current weather conditions for your location or any city.
- **Location Detection**: Automatically detects your current location to provide instant weather updates.
- **Weather Forecast**: View the weather forecast for today and the upcoming days.
- **Humidity Forecast**: Get detailed humidity information along with the weather forecast.
- **Search Functionality**: Easily change the prefilled city to get weather information for any location you want.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **User-Friendly Interface**: Intuitive layout for easy navigation.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the application.
- **HTML**: The standard markup language for creating web pages.
- **TailwindCSS**: A utility-first CSS framework for creating custom designs.
- **TypeScript**: A superset of JavaScript that adds static types.

## Installation

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

```
   git clone https://github.com/KamyarAzz/Weather-Insight.git
```

2. Navigate to the project directory:

```
   cd Weather-Insight
```

4. Install the dependencies:

```
   npm install
```

5. Edit the .env file in the root directory and add your OpenWeatherMap API and IpGeoLocation API key:

```
   VITE_WEATHER_API_KEY=your_OpenWeatherMap_api_key_here
   VITE_GEO_API_KEY=your_IpGeoLocation_api_key_here
```

6. Start the development server:

```
   npm run dev
```

7. Open your browser and go to

```
http://localhost:5173
```

## Usage

Once the application is running, it will automatically detect your current location and display the current weather and forecast for today and the next week. You can also enter the name of any city in the search bar to change the prefilled city and get the corresponding weather information. The app will display the temperature, humidity, and other relevant weather details.

## API

This application uses the OpenWeatherMap API and the IpGeoLocation API to fetch weather data. You will need to sign up for a free account and obtain the API keys to use the application. While I have provided API keys for your convenience, I would appreciate it if you could create your own API keys for better security and to avoid hitting usage limits.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
