import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow } from "react-icons/wi";

// Example static hourly weather for today
const hourlyWeather = [
  { time: "06:00", temp: 18, condition: "sunny" },
  { time: "09:00", temp: 20, condition: "sunny" },
  { time: "12:00", temp: 24, condition: "cloudy" },
  { time: "15:00", temp: 25, condition: "sunny" },
  { time: "18:00", temp: 22, condition: "rain" },
  { time: "21:00", temp: 20, condition: "cloudy" },
];

// Example static daily forecast for 7 days
const dailyWeather = [
  { day: "Thu", tempHigh: 25, tempLow: 18, condition: "sunny" },
  { day: "Fri", tempHigh: 24, tempLow: 17, condition: "cloudy" },
  { day: "Sat", tempHigh: 22, tempLow: 16, condition: "rain" },
  { day: "Sun", tempHigh: 23, tempLow: 17, condition: "sunny" },
  { day: "Mon", tempHigh: 21, tempLow: 15, condition: "thunder" },
  { day: "Tue", tempHigh: 20, tempLow: 14, condition: "cloudy" },
  { day: "Wed", tempHigh: 22, tempLow: 16, condition: "sunny" },
];

// Helper function to map condition to icon
const getWeatherIcon = (condition, size = 30) => {
  switch (condition) {
    case "sunny":
      return <WiDaySunny size={size} className="text-yellow-400" />;
    case "cloudy":
      return <WiCloudy size={size} className="text-gray-400" />;
    case "rain":
      return <WiRain size={size} className="text-blue-400" />;
    case "thunder":
      return <WiThunderstorm size={size} className="text-purple-500" />;
    case "snow":
      return <WiSnow size={size} className="text-blue-200" />;
    default:
      return <WiDaySunny size={size} />;
  }
};

const Weather = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4">Weather Forecast</h2>

      {/* Hourly Weather */}
      <h3 className="font-medium mb-2">Today's Hourly Forecast</h3>
      <div className="flex overflow-x-auto gap-4 mb-6 py-2">
        {hourlyWeather.map(({ time, temp, condition }) => (
          <div
            key={time}
            className="flex flex-col items-center justify-center min-w-[70px] bg-gray-100 rounded-lg p-2"
          >
            <span className="text-sm font-medium">{time}</span>
            {getWeatherIcon(condition)}
            <span className="font-medium mt-1">{temp}°C</span>
          </div>
        ))}
      </div>

      {/* Daily Forecast */}
      <h3 className="font-medium mb-2">Next 7 Days</h3>
      <div className="grid grid-cols-7 gap-2">
        {dailyWeather.map(({ day, tempHigh, tempLow, condition }) => (
          <div
            key={day}
            className="flex flex-col items-center bg-gray-100 rounded-lg p-2"
          >
            <span className="font-medium">{day}</span>
            {getWeatherIcon(condition, 24)}
            <span className="text-sm">
              {tempHigh}° / {tempLow}°
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;
