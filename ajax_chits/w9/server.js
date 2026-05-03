    // Import express
const express = require('express');

const app = express();

// Serve static files (HTML + JSON)
app.use(express.static(__dirname));

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});