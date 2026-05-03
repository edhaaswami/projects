const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];

//get
app.get('/todos', (req, res) => {
    res.json(todos);
});

//add
app.post('/todos', (req,res)=>{
    const newtask = {
        id: Date.now(),
        text: req.body.text
    };
    todos.push(newtask);
    res.json(newtask);
});

//update
app.put('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const task = todos.find(t => t.id === id);

    if(task) {
        task.text = req.body.text;
        res.json(task);
    } else {
        res.status(500).send("task not found");
    }
});

//dlt
app.delete('/todos/:id', (req,res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.send("deleted");
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})