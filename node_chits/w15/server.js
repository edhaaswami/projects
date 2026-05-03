const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use('/images', express.static('images'));

app.get('/api/products', (req,res) => {
    fs.readFile(__dirname + '/products.json', 'utf8', (err, data) =>{
        if(err)
        {
            return res.status(500).send("errror");
        }
        res.json(JSON.parse(data));
    });
});

app.get('/' , (req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, ()=>
{
    console.log(`server running http://localhost:${PORT}`);
});