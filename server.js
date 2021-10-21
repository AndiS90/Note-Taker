const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');


//const { nanoid } = require('nanoid')

//require router index
const api = require('./routes/index.js');

const app = express();
const PORT = process.env.port || 3001;

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

// //GET /api/notes should read the db.json file and return all saved notes as JSON.
// // res.json() allows us to return JSON instead of a buffer, string, or static file
// app.get('/api/notes', (req, res) => {
//   console.info(`${req.method} request received for notes`);
//   readFromFile('./db/notes.json')
//     .then((data) => res.json(JSON.parse(data)))
// });



// // POST to take submitted notes and add them to the list of notes
// app.post('/', (req, res) => {
   
//   //log that post req was received
//   console.info(`${req.method} request received to add a note`);

//     // Destructuring assignment for the items in req.body
//     const { title, text } = req.body;

//     if (req.body) {
//       // Variable for the object we will save
//       const newNote = {
//         title,
//         text,
//         note_id: nanoid(), //something... but this comma stays => // ,    
//       };

//       readAndAppend(newNote, './db/notes.json');



//       res.json(`note added successfully 🚀`);
      
//       //return newNote;
//     } else {
//       res.json('Error in adding note');
//     }
//   }


// );


// // GET Route for a specific note 
// // eventally to pull to front, select out of list, maybe delete?
// app.get('notes/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       const result = json.filter((note) => app.note_id === noteId);
//       return result.length > 0 ?
//         res.json(result) :
//         res.json('No note with that ID');
//     });
// });

// // DELETE Route for a specific note
// app.delete('/:note_id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/notes.json')
//     .then((data) => JSON.parse(data))
//     .then((json) => {
//       // Make a new array of all notes except the one with the ID provided in the URL
//       const result = json.filter((note) => app.note_id !== noteId);

//       // Save that array to the filesystem
//       writeToFile('./db/notes.json', result);

//       // Respond to the DELETE request
//       res.json(`Item ${noteId} has been deleted 🗑️`);
//     });
// });






app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);