const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ✅ USE ENV VARIABLE (required for AWS)
const MONGO_URI = process.env.MONGO_URI;

// fallback (local testing only)
const LOCAL_DB = "mongodb://127.0.0.1:27017/student";

mongoose.connect(MONGO_URI || LOCAL_DB)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_marks: Number
});

const Student = mongoose.model("studentmarks", studentSchema);

// Home route
app.get("/", (req, res) => {
    res.send("App Running 🚀");
});

// Insert sample data
app.get("/insert", async (req, res) => {
    await Student.insertMany([
        { Name: "A", Roll_No: 1, WAD_Marks: 25, CC_Marks: 26, DSBDA_Marks: 30, CNS_Marks: 28, AI_marks: 27 },
        { Name: "B", Roll_No: 2, WAD_Marks: 10, CC_Marks: 20, DSBDA_Marks: 15, CNS_Marks: 18, AI_marks: 19 },
        { Name: "C", Roll_No: 3, WAD_Marks: 35, CC_Marks: 36, DSBDA_Marks: 37, CNS_Marks: 38, AI_marks: 39 }
    ]);
    res.send("Inserted");
});

// Show all
app.get("/all", async (req, res) => {
    const data = await Student.find();
    const count = await Student.countDocuments();
    res.json({ count, data });
});

// Table view
app.get("/table", async (req, res) => {
    const data = await Student.find();

    let html = `<h2>Student Table</h2><table border="1">
    <tr><th>Name</th><th>Roll</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>`;

    data.forEach(s => {
        html += `<tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_marks}</td>
        </tr>`;
    });

    html += "</table>";
    res.send(html);
});

// ✅ CRITICAL for AWS
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});