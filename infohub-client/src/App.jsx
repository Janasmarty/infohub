import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Weather from "./components/WeatherModule";
import Currency from "./components/CurrencyConverter";
import Quotes from "./components/QuoteGenerator";

// Import background images from assets
import weatherBg from "./assets/weather-bg.jpg";
import currencyBg from "./assets/currency-bg.jpg";
import quotesBg from "./assets/quotes-bg.jpg";

const App = () => {
  const [activeTab, setActiveTab] = useState("weather");

  // Map each tab to its background image
  const bgImages = {
    weather: weatherBg,
    currency: currencyBg,
    quotes: quotesBg,
  };

  const tabs = [
    { id: "weather", label: "🌦 Weather" },
    { id: "currency", label: "💱 Currency" },
    { id: "quotes", label: "💬 Quotes" },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center text-white relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImages[activeTab]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.8s ease-in-out",
      }}
    >
      {/* Overlay to darken bg */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      {/* Header */}
      <header className="relative z-10 text-center mt-8">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">🌐 InfoHub</h1>
        <p className="text-lg text-gray-300 drop-shadow-md">
          Real-time Weather • Currency • Quotes Dashboard
        </p>
      </header>

      {/* Tabs */}
      <nav className="relative z-10 flex space-x-6 bg-white/10 backdrop-blur-lg px-8 py-3 rounded-2xl shadow-lg mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`transition-all duration-300 text-lg font-semibold ${
              activeTab === tab.id
                ? "text-yellow-300 border-b-4 border-yellow-400 pb-1"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="relative z-10 mt-10 w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl text-center">
        <AnimatePresence mode="wait">
          {activeTab === "weather" && (
            <motion.div
              key="weather"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Weather />
            </motion.div>
          )}

          {activeTab === "currency" && (
            <motion.div
              key="currency"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Currency />
            </motion.div>
          )}

          {activeTab === "quotes" && (
            <motion.div
              key="quotes"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <Quotes />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-10 text-gray-300 text-sm mb-4">
        © {new Date().getFullYear()} InfoHub — Made with 💙 by Jana
      </footer>
    </div>
  );
};

export default App;
