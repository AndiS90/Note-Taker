const express = require('express');
const path = require('path');

//using custom middleware from class to make troubleshooting easier
const { clog } = require('./middleware/clog');

//require router index
const api = require('./routes/index.js');

const app = express();

const PORT = process.env.PORT || 3001;


// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON 
app.use(express.json());

// Middleware for parsing urlencoded form data
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

//serves static files such as images, CSS files, and JavaScript files
app.use(express.static('public'));




//GET "root" (/) should return the index.html file.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//GET wildcard route to direct users back to opening page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);