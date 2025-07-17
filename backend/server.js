const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users-routes');
const { apiRouter } = require("./api/v1/routes");

// require("./config/db");
require("./utils/emailHelpers");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;

// middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(bodyParser.json());

// routes
app.use('/api/users', userRoutes);
app.use("/api/v1", apiRouter);

app.get('/api/weather', async(req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'Please choose a city to get the forecast'})
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q:city,
          appid: API_KEY,
          units: 'metric'
        }
      }
    );

    const data = response.data;
    console.log("ICON CODE:", data.weather[0].icon);
    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      wind_kph: data.wind.speed,
      wind_dir: data.wind.deg
    });
  } catch (error) {
    console.error('API error for ${city}:', error.message);
    res.status(500).json({ error: 'Failed to retrieve weather data'});
  }
});

mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Weather API proxy is running on http://localhost:${PORT}`);
      })
    })
    .catch((err) => {
      console.error('MongoDB connection failed:', err.message);
    });