const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 3000;
app.use(express.json());
const FILE = 'data.json'

app.get('/users', (req,res) => {
    // let data = JSON.parse(fs.readFileSync(FILE));
    // let li = document.getElementById('list');

    fs.readFile(FILE, 'utf-8', (err,data) => {
        if(err){
            return res.status(500).send("File error");
        }
        else{
            res.json(JSON.parse(data));
        }
    })
    
})


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})


app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));