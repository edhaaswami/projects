const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const FILE = 'data.json';

// Read tasks
function readTasks() {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE));
}

// Save tasks
function saveTasks(tasks) {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

// GET
app.get('/tasks', (req, res) => {
    res.json(readTasks());
});

// POST
app.post('/tasks', (req, res) => {
    let tasks = readTasks();

    const newTask = {
        id: Date.now(),
        text: req.body.text
    };

    tasks.push(newTask);
    saveTasks(tasks); 

    res.json(newTask);
});

// DELETE
app.delete('/tasks/:id', (req, res) => {
    let tasks = readTasks().filter(t => t.id != req.params.id);
    saveTasks(tasks);

    res.sendStatus(200);
});

//UPDATE
app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);

    let tasks = readTasks();
    let to_be_edited_task = tasks.find(t => t.id === id);

    if(to_be_edited_task){
        to_be_edited_task.text = req.body.text;

        saveTasks(tasks);
        res.json(to_be_edited_task);
    }else{
        res.status(404).send("Task Not Found.");
    }
    
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});