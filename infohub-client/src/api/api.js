import axios from "axios";

const API_BASE = "https://infohub-server-eml6.onrender.com";



export const fetchWeather = (city) =>
  axios.get(`${API_BASE}/api/weather?city=${city}`);

export const fetchCurrency = () =>
  axios.get(`${API_BASE}/api/currency`);

export const fetchQuote = () =>
  axios.get(`${API_BASE}/api/quotes`);
