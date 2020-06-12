const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.post('/admin', (req, res) => {
    res.send("<h1> backend with empty logic </h1>");
});


app.listen(4000);