// Arimathea Charmille H. Suarez
// CMSC 100 - U3L

const express = require('express');
const path = require('path');
const app = express();


app.use(express.static('files'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

});