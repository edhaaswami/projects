const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/student", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
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


// c) Insert sample data
app.get("/insert", async (req, res) => {
    await Student.insertMany([
        { Name: "A", Roll_No: 1, WAD_Marks: 25, CC_Marks: 26, DSBDA_Marks: 30, CNS_Marks: 28, AI_marks: 27 },
        { Name: "B", Roll_No: 2, WAD_Marks: 10, CC_Marks: 20, DSBDA_Marks: 15, CNS_Marks: 18, AI_marks: 19 },
        { Name: "C", Roll_No: 3, WAD_Marks: 35, CC_Marks: 36, DSBDA_Marks: 37, CNS_Marks: 38, AI_marks: 39 }
    ]);
    res.send("Data Inserted");
});


// d) Count + display all
app.get("/all", async (req, res) => {
    const data = await Student.find();
    const count = await Student.countDocuments();
    res.send({ count, data });
});


// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
    const data = await Student.find({ DSBDA_Marks: { $gt: 20 } }, { Name: 1, _id: 0 });
    res.send(data);
});


// f) Increase marks by 10 (example Roll_No = 1)
app.get("/update", async (req, res) => {
    await Student.updateOne(
        { Roll_No: 1 },
        { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_marks: 10 } }
    );
    res.send("Updated");
});


// g) All subjects > 25
app.get("/all25", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    }, { Name: 1, _id: 0 });

    res.send(data);
});


// h) Less than 40 (assuming WAD = Maths, CNS = Science)
app.get("/less40", async (req, res) => {
    const data = await Student.find({
        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }
    }, { Name: 1, _id: 0 });

    res.send(data);
});


// i) Delete student (Roll_No = 2)
app.get("/delete", async (req, res) => {
    await Student.deleteOne({ Roll_No: 2 });
    res.send("Deleted");
});


// j) Table view
app.get("/table", async (req, res) => {
    const data = await Student.find();

    let html = `
    <h2>Student Marks</h2>
    <table border="1">
    <tr>
        <th>Name</th><th>Roll</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th>
    </tr>`;

    data.forEach(s => {
        html += `
        <tr>
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


// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});