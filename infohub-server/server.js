import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.js";
import currencyRoutes from "./routes/currency.js";
import quotesRoutes from "./routes/quotes.js";

dotenv.config();
const app = express();

app.use(cors({ origin:"https://infohub-clien.onrender.com", "http://localhost:5173" }));
app.use(express.json());

app.use("/api/weather", weatherRoutes);
app.use("/api/currency", currencyRoutes);
app.use("/api/quotes", quotesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ InfoHub backend running on port ${PORT}`)
);
