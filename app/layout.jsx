"use client"

import "./globals.css";
import Link from 'next/link';
import Snowfall from './components/Snowfall.jsx';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationSet, setLocationSet] = useState(false);

  const getLocation = async () => {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setLocation({
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //       });
    //       setLocationSet(true);
    //     },
    //     async (error) => {
    //       console.error(error.message);
    //       await getIpLocation();
    //     }
    //   );
    // } else {
    //   console.error('Geolocation is not supported by this browser.');
    // }

    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });
      setLocationSet(true);
    } catch (error) {
      console.error('Error fetching IP location:', error);
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

          const now = new Date();

          const timeToSunrise = ((now - sunrise) / (1000 * 60 * 60)) % 24;
          const timeToSunset = ((now - sunset) / (1000 * 60 * 60)) % 24;

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

            document.documentElement.style.setProperty('--primary-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
          }
          else if (now.getHours() > sunset.getHours() || now.getHours() < sunrise.getHours()) {
            document.documentElement.style.setProperty('--primary-color', `rgb(${night[0]}, ${night[1]}, ${night[2]})`);
          }

        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchDaylight();
  }, [locationSet, location.latitude, location.longitude]);

  return (
    <html>
      <head>
        <title>
          Sofia Egan's personal website! Check out the projects I've built here.
        </title>
        <link rel="icon" type="image/x-icon" href="/frog_pfp.png"></link>
        <meta name="description" content="Sofia Egan's personal website. Check out my projects here!" />
        <meta name="keywords" content="Sofia Egan, hackathons, projects, software development, high schooler, Boston" />
        <meta name="author" content="Sofia Egan" />

        <meta property="og:title" content="Sofia Egan's Personal Website" />
        <meta property="og:description" content="Sofia Egan's personal website. Check out my projects here!" />
        <meta property="og:image" content="https://github.com/user-attachments/assets/977b0f29-d4ee-49e6-9475-821760156f50" />
        <meta property="og:type" content="website" />
      </head>
      
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