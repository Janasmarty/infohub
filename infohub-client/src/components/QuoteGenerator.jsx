import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchQuote } from "../api/api";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const loadQuote = async () => {
    try {
      setLoading(true);
      const { data } = await fetchQuote();
      if (!data.success) throw new Error("Failed to load quote");
      setQuote(data.quote);
      setAuthor(data.author);
    } catch {
      setQuote("Keep moving forward!");
      setAuthor("Unknown");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <motion.div
      className="text-center text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-4">💬 Daily Quote</h2>
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <blockquote className="italic text-lg">
          “{quote}”
          <footer className="mt-2 text-white/70">— {author}</footer>
        </blockquote>
      )}
      <button
        onClick={loadQuote}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
      >
        New Quote
      </button>
    </motion.div>
  );
};

export default Quotes;
