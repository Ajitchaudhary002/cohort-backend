const express = require('express');

const app = express(); // server instance created

app.get('/', (req, res) => {
    res.send('Hello, World!');
})
                                     
app.get('/about', (req, res) => {
    res.send('This is the about page.');
})

app.listen(3000, () => {                           // server starts
    console.log('Server is running on port 3000'); 
})
