// src/components/Weather.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiCloud, WiHumidity, WiRain, WiStrongWind, WiSunrise } from 'react-icons/wi';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const URL = 'https://api.open-meteo.com/v1/forecast?latitude=26.0321&longitude=50.5108&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,cloud_cover,wind_speed_10m,temperature_80m,soil_temperature_0cm&forecast_days=1';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(URL);
        setWeatherData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [URL]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentWeather = weatherData.hourly;

  return (
    <div className="weather-overlay">
      <h1 className="weather-title">Weather Forecast</h1>
      <div className="weather-card">
        <div className="weather-info">
          <div className="weather-item">
            <WiCloud size={30} />
            <p>{currentWeather.cloud_cover[0]}% Cloud Cover</p>
          </div>
          <div className="weather-item">
            <WiHumidity size={30} />
            <p>{currentWeather.relative_humidity_2m[0]}% Humidity</p>
          </div>
          <div className="weather-item">
            <WiRain size={30} />
            <p>{currentWeather.precipitation_probability[0]}% Precipitation</p>
          </div>
          <div className="weather-item">
            <WiStrongWind size={30} />
            <p>{currentWeather.wind_speed_10m[0]} m/s Wind Speed</p>
          </div>
          <div className="weather-item">
            <WiSunrise size={30} />
            <p>Temperature: {currentWeather.temperature_2m[0]}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;