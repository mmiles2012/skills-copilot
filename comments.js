//create web server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/comments', (req, res) => {
    const comments = fs.readFileSync('./comments.json');
    res.send(comments);
});

app.post('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('./comments.json'));
    comments.push(req.body);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.send('Comment added');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});