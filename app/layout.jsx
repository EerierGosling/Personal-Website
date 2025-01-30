"use client"

import "./globals.css";
import Link from 'next/link';
import Snowfall from './components/Snowfall.jsx';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationSet, setLocationSet] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const [backgroundColor, setBackgroundColor] = useState("#a8caff");

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationSet(true);
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const fetchDaylight = async () => {
      if (locationSet) {
        const params = new URLSearchParams({
          latitude: location.latitude,
          longitude: location.longitude,
          daily: ["sunrise", "sunset"].join(','),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          forecast_days: 1,
        });

        const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

        const daylight = [168, 202, 255];
        const night = [20, 20, 54];

        try {
          const response = await fetch(url);
          const jsonResponse = await response.json();


          const daily = jsonResponse.daily;

          const sunrise = new Date(daily.sunrise);
          const sunset = new Date(daily.sunset);

          setWeatherData({
            sunrise,
            sunset,
          });

          const now = new Date();

          const timeToSunrise = ((now - sunrise) / (1000 * 60 * 60)) % 24;
          const timeToSunset = ((now - sunset) / (1000 * 60 * 60)) % 24;

          console.log(now, sunrise, sunset);

          if (Math.abs(timeToSunrise) < 0.5 || Math.abs(timeToSunset) < 0.5) {

            let dayPercent = 0;

            if (Math.abs(timeToSunrise) < 0.5) {
              dayPercent = 0.5 + timeToSunrise;
            } else {
              dayPercent = 0.5 - timeToSunset;
            }

            const color = [];

            for (var i = 0; i < 3; i++) {
              color.push(daylight[i] * dayPercent + night[i] * (1 - dayPercent));
            }

            console.log(color);

            document.documentElement.style.setProperty('--primary-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
          }
          else if (now.getHours() > sunset.getHours() || now.getHours() < sunrise.getHours()) {
            document.documentElement.style.setProperty('--primary-color', `rgb(${night[0]}, ${night[1]}, ${night[2]})`);
          }

          console.log(timeToSunrise, timeToSunset);


        } catch (error) {
          console.error('Error fetching weather data:', error);
          setError('Error fetching weather data');
        }
      }
    };

    fetchDaylight();
  }, [locationSet, location.latitude, location.longitude]);

  return (
    <html>
      <body>
        <div className="App">
          <div className="snow-container">
            <Snowfall />
          </div>

          <div className="header">
            <nav>
              <div className="header-links">
                <div className="header-link"><Link href="/"><p className="header-link-text">Home</p></Link></div>
                <div className="header-link"><Link href="/projects"><p className="header-link-text">Projects</p></Link></div>
              </div>
            </nav>
          </div>
        </div>
        {children}
      </body>
    </html>

  );
}