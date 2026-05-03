const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Route
app.get("/weather", async (req, res) => {
    const { lat, lon } = req.query;

    // 🔴 Validation
    if (!lat || !lon) {
        return res.status(400).json({
            error: "Latitude and Longitude are required"
        });
    }

    if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({
            error: "Only numeric values allowed"
        });
    }

    try {
        const response = await axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: "Error fetching weather data"
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});