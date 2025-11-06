// controllers/quotesController.js
import axios from "axios";

export const getQuote = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.QUOTES_API_URL);

    res.json({
      success: true,
      quote: data.content,
      author: data.author,
    });
  } catch (err) {
    console.error("Quote fetch failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching quote",
      error: err.message,
    });
  }
};
