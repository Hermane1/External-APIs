const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/weather', async (req, res) => {
    const city = req.body.city;
    const apiKey = 'ddb23d8efc42d8d2d4b9154da05f3830'; // Replace with your actual API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
