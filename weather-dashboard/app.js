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

// POST route to handle weather data request
app.post('/weather', (req, res) => {
    const { city } = req.body;

    // Replace with your logic to fetch weather data based on the city
    // Example response (for demonstration purposes):
    const weatherData = {
        temperature: '25°C',
        description: 'Sunny'
    };

    res.json(weatherData); // Respond with JSON data
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
