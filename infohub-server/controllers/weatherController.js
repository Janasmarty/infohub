import axios from "axios";

export const getWeather = async (req, res) => {
  const city = req.query.city || "London";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    res.json({
      success: true,
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    });
  } catch (error) {
    console.error("Weather fetch failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch weather" });
  }
};
