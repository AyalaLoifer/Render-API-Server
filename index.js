// index.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const RENDER_API_KEY = process.env.RENDER_API_KEY; // API Key שנשמור בקובץ .env
const RENDER_API_URL = "https://api.render.com/v1/services"; // URL של ה-API של Render

app.get('/', (req, res) => {
    res.send('Welcome to the Render Services API');
});
// Endpoint שמחזיר את רשימת האפליקציות המותקנות ב-Render
app.get('/services', async (req, res) => {
    try {
        const response = await axios.get(RENDER_API_URL, {
            headers: {
                'Authorization': `Bearer ${RENDER_API_KEY}`,
                'Accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch services', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
