const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static('public'));

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

// Insert (removes duplicates first)
app.get('/insert', async (req, res) => {
    await Student.deleteMany({});
    await Student.insertMany([
        {Name:"ABC", Roll_No:111, WAD_Marks:25, CC_Marks:25, DSBDA_Marks:25, CNS_Marks:25, AI_Marks:25},
        {Name:"XYZ", Roll_No:112, WAD_Marks:30, CC_Marks:20, DSBDA_Marks:22, CNS_Marks:28, AI_Marks:26},
        {Name:"PQR", Roll_No:113, WAD_Marks:10, CC_Marks:15, DSBDA_Marks:18, CNS_Marks:12, AI_Marks:20}
    ]);
    res.json({ message: "Data Inserted" });
});

// Get all
app.get('/all', async (req, res) => {
    const data = await Student.find();
    res.json(data);
});

// Filters
app.get('/dsbda', async (req, res) => {
    const data = await Student.find({DSBDA_Marks: {$gt:20}});
    res.json(data);
});

app.get('/update', async (req, res) => {
    await Student.updateMany({}, {
        $inc: {
            WAD_Marks:10,
            CC_Marks:10,
            DSBDA_Marks:10,
            CNS_Marks:10,
            AI_Marks:10
        }
    });
    res.json({ message: "Marks Updated" });
});

app.get('/above25', async (req, res) => {
    const data = await Student.find({
        WAD_Marks:{$gt:25},
        CC_Marks:{$gt:25},
        DSBDA_Marks:{$gt:25},
        CNS_Marks:{$gt:25},
        AI_Marks:{$gt:25}
    });
    res.json(data);
});

app.get('/lessthan40', async (req, res) => {
    const data = await Student.find({
        WAD_Marks:{$lt:40},
        CNS_Marks:{$lt:40}
    });
    res.json(data);
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});