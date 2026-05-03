const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

// Connect MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});