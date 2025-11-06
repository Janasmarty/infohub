import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchWeather = (city) =>
  axios.get(`${API_BASE}/weather?city=${city}`);

export const fetchCurrency = () =>
  axios.get(`${API_BASE}/currency`);

export const fetchQuote = () =>
  axios.get(`${API_BASE}/quotes`);
