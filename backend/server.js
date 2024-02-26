require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const config = require("./config");

const app = express();
const PORT = config.port || 3001;

app.use(express.json());
app.use(cors());

app.get("/location", async (req, res) => {
  try {
    const { city, limit } = req.query;
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${config.weatherApiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get("/forecast", async (req, res) => {
  try {
    const { city, state, country } = req.query;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${config.weatherApiKey}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
