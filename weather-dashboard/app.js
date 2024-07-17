const express = require('express'); // Import Express framework for creating the server.
const bodyParser = require('body-parser'); // Import body-parser middleware to parse incoming request bodies.
const cors = require('cors'); // Import CORS middleware for handling Cross-Origin Resource Sharing.

const app = express(); // Create an instance of an Express application.
const port = 3000; // Define the port on which the server will listen.

// CORS configuration to allow cross-origin requests
const corsOptions = {
    origin: '*', // Allow requests from any origin
    credentials: true, // Allow credentials (like cookies) to be included in requests
    optionSuccessStatus: 200, // Set success status code for OPTIONS requests
};

app.use(cors(corsOptions)); // Use CORS middleware with the specified options

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON bodies in incoming requests

// Function to fetch weather data from the OpenWeatherMap API
async function fetchWeatherData(lat, lon) {
    try {
        var apiKey = "ddb23d8efc42d8d2d4b9154da05f3830"; // Your API key for OpenWeatherMap

        // Fetch weather data from OpenWeatherMap API using latitude and longitude
        const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`); // Handle HTTP errors
        }
        const data = await response.json(); // Parse the response JSON
        return data.current; // Return the current weather data

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error); // Log any errors encountered
    }
}

// POST route to handle weather data request
app.post('/weather', async (req, res) => {
    console.log(req.body); // Log the request body for debugging
    var lat = req.body.lat; // Extract latitude from the request body
    var lon = req.body.lon; // Extract longitude from the request body
    
    var weatherData = await fetchWeatherData(lat, lon); // Call the function to fetch weather data
    res.json(weatherData); // Respond with the weather data in JSON format
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log a message indicating the server is running
});
