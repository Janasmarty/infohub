import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchCurrency } from "../api/api";

const Currency = () => {
  const [data, setData] = useState(null);
  const [amount, setAmount] = useState(1);
  const [resultINR, setResultINR] = useState(0);
  const [resultEUR, setResultEUR] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCurrency = async () => {
    try {
      setLoading(true);
      const { data } = await fetchCurrency();
      if (!data.success) throw new Error("Currency fetch failed");
      setData(data);
    } catch (err) {
      setError("Failed to fetch currency data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCurrency();
  }, []);

  const handleConvert = () => {
    if (data) {
      setResultINR((amount * data.usdToInr).toFixed(2));
      setResultEUR((amount * data.usdToEur).toFixed(2));
    }
  };

  return (
    <motion.div
      className="text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-4">💱 Currency Converter</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {data && !loading && (
        <>
          <p className="text-lg mb-2">
            Base Currency: <strong>{data.base}</strong>
          </p>

          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-4 py-2 text-black rounded-md"
              placeholder="Enter amount in USD"
            />
            <button
              onClick={handleConvert}
              className="ml-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
            >
              Convert
            </button>
          </div>

          {resultINR > 0 && (
            <div className="text-lg">
              <p>🇮🇳 {amount} USD = {resultINR} INR</p>
              <p>🇪🇺 {amount} USD = {resultEUR} EUR</p>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default Currency;
