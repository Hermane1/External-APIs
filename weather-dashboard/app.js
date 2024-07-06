const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
    origin: '*',
    credentials: true, // access-control-allow-credentials: true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

async function fetchWeatherData(lat, lon) {
    try {
        var apiKey = "ddb23d8efc42d8d2d4b9154da05f3830";
    
        // var lat = 10;
        // var lon = 10;
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        return data.current;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);

    }

}

// POST route to handle weather data request
app.post('/weather', async (req, res) => {
    console.log(req.body);
    var lat = req.body.lat;
    var lon = req.body.lon;
    // const { city } = req.body;
    // Replace with your logic to fetch weather data based on the city
    // Example response (for demonstration purposes):
    // const weatherData = {
    //     temperature: '25°C',
    //     description: 'cloudy'
    // };
    var weatherData = await fetchWeatherData(lat, lon); // Call the function to fetch weather data
    // console.log(weatherData);
    res.json(weatherData); // Respond with JSON data
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
