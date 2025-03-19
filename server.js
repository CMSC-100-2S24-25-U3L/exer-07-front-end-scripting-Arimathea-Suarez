// Arimathea Charmille H. Suarez
// CMSC 100 - U3L

// To import the express
const express = require('express');
const path = require('path');
const app = express();

// Static files
app.use(express.static('files'));

// Starts the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

});