const express = require('express');
const path = require('path');
const fs = require('fs');
const { clog } = require('./middleware/clog');

//const notes = require('express').Router();
const notesFile= require('./db/db.json');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');

const app = express();
const PORT = process.env.port || 3001;

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON 
app.use(express.json());

// Middleware for parsing urlencoded form data
app.use(express.urlencoded({ extended: true }));

 //serves static files such as images, CSS files, and JavaScript files
app.use(express.static('public'));

//GET * should return the index.html file.
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/index.html'))
);

//GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/assets/notes.html'))
);


// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => 
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// GET Route for a specific note
app.get('notes/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => app.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

app.post('api/notes', (req, res) =>  { 
// Destructuring assignment for the items in req.body
const { title, text} = req.body;

// If all the required properties are present
if (req.body) {
  // Variable for the object we will save
  const newNote = {
    title,
    text,
    tip_id: //something... but this comma stays => // ,    
  };

  readAndAppend(newNote, './db/notes.json');
  res.json(`note added successfully 🚀`);
} else {
  res.error('Error in adding note');
}
}


);






app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);