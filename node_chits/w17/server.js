const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;
app.use('/images', express.static('images'));

// API to get employees
app.get('/api/employees', (req, res) => {
    fs.readFile(__dirname + '/employee.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.json(JSON.parse(data));
    });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});