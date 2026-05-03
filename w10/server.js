const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];

// GET all tasks
app.get("/todos", (req, res) => {
    res.json(todos);
});

// ADD task
app.post("/todos", (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text
    };
    todos.push(newTask);
    res.json(newTask);
});

// UPDATE task
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = todos.find(t => t.id === id);

    if (task) {
        task.text = req.body.text;
        res.json(task);
    } else {
        res.status(404).send("Task not found");
    }
});

// DELETE task
app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.send("Deleted");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});