const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Choose your desired port number

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route to handle weather data request
app.post('/weather', (req, res) => {
    const { city } = req.body;

    // Replace with your logic to fetch weather data based on the city
    // Example response (for demonstration purposes):
    const weatherData = {
        city: city,
        temperature: '25°C',
        description: 'Sunny'
    };

    // Simulate some delay for demonstration purposes
    setTimeout(() => {
        res.json(weatherData); // Respond with JSON data
    }, 1000); // Simulating delay of 1 second
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
