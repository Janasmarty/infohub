import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fetchWeather } from "../api/api";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");
  const [error, setError] = useState("");

  const loadWeather = async () => {
    try {
      setLoading(true);
      const { data } = await fetchWeather(city);
      if (!data.success) throw new Error(data.message || "Error fetching weather");
      setWeather(data);
    } catch (err) {
      setError("Failed to load weather data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <motion.div
      className="text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-4">🌤 Weather Info</h2>

      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 text-black rounded-md"
          placeholder="Enter city"
        />
        <button
          onClick={loadWeather}
          className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {weather && !loading && !error && (
        <div>
          <h3 className="text-4xl">{weather.city}, {weather.country}</h3>
          <p className="text-2xl mt-2">🌡 {weather.temperature}°C</p>
          <p className="italic text-white/80 mt-1">{weather.description}</p>
          {weather.icon && (
            <img src={weather.icon} alt="icon" className="mx-auto mt-2 w-20" />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Weather;
