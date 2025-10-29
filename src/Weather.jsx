import { useState } from "react";
import searchIcon from "/images/search.png";
import snowIcon from "/images/snowIcon.png";
import waves from "/images/wave.png";
import humidity from "/images/humidity.png";

const WeatherDetail = ({ icon, temp, city, country, lat, lon, humi, wind }) => {
  return (
    <div className="weather-detail">
      <img src={icon} alt="weather-icon" className="snow-icon" />
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div className="lat">
          latitude <br /> {lat}
        </div>
        <div className="lon">
          longitude <br /> {lon}
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity" className="humidity-icon" />
          <p className="percent">{humi}%</p>
          <p className="text">Humidity</p>
        </div>
        <div className="element">
          <img src={waves} alt="wind" className="wave-icon" />
          <p className="percent">{wind} km/h</p>
          <p className="text">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export const Weather = () => {
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(13.08);
  const [lon, setLon] = useState(80.27);
  const [temp, setTemp] = useState(0);
  const [humi, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState(snowIcon);
  const [search, setSearch] = useState("");

  const getWeather = async () => {
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${search}`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("City not found!");
        return;
      }

      const { latitude, longitude, country_code, name } = geoData.results[0];
      setLat(latitude);
      setLon(longitude);
      setCity(name);
      setCountry(country_code);

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();

      const current = weatherData.current;
      setTemp(current.temperature_2m);
      setHumidity(current.relative_humidity_2m);
      setWind(current.wind_speed_10m);

      if (current.temperature_2m < 5) setIcon("/images/snowIcon.png");
      else if (current.temperature_2m < 20) setIcon("/images/cloud.png");
      else setIcon("/images/sun.png");
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data!");
    }
  };

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search City"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-icon" onClick={getWeather}>
          <img src={searchIcon} alt="search-icon" className="search" />
        </div>
      </div>

      <WeatherDetail
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        lon={lon}
        humi={humi}
        wind={wind}
      />
    </div>
  );
};
