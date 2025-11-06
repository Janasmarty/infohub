// controllers/currencyController.js
import axios from "axios";

export const getCurrency = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.CURRENCY_API_URL);

    const usdToInr = data.conversion_rates.INR;
    const usdToEur = data.conversion_rates.EUR;

    res.json({
      success: true,
      base: data.base_code,
      usdToInr,
      usdToEur,
    });
  } catch (err) {
    console.error("Currency fetch failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching currency rates",
      error: err.message,
    });
  }
};
