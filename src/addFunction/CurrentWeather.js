import React, { useEffect, useState } from 'react';
import './weather.css';

function CurrentWeather() {
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
      const fetchWeather = async () => {
        const apiKey = '8888f3bbcbcaa365ce777cde416c7376'; // OpenWeatherMap API 키
        const city = 'Ulsan'; // 날씨를 가져올 도시
  
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
          );
  
          if (response.ok) {
            const data = await response.json();
            setWeather(data);
          } else {
            console.error('날씨 데이터 출력 오류');
          }
        } catch (error) {
          console.error('Error while fetching weather data:', error);
        }
      };
  
      fetchWeather();
    }, []);
  
    return (
        <span className="current-weather">
          {weather ? (
            <>
              <span className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt={weather.weather[0].description}
                />
              </span>
              <span className="weather-info">
                {weather.weather[0].main}, {weather.weather[0].description}
              </span>
            </>
          ) : (
            'Loading weather...'
          )}
        </span>
      );
    }
  

export default CurrentWeather;