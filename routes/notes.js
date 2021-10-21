const notes = require('express').Router();
const { nanoid } = require('nanoid');

const notesFile = require('../db/db.json');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');


//GET /api/notes should read the db.json file and return all saved notes as JSON.
// res.json() allows us to return JSON instead of a buffer, string, or static file
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json')
      .then((data) => res.json(JSON.parse(data)))
  });
  
  
  
  // POST to take submitted notes and add them to the list of notes
  notes.post('/', (req, res) => {
     
    //log that post req was received
    console.info(`${req.method} request received to add a note`);
  
      // Destructuring assignment for the items in req.body
      const { title, text } = req.body;
  
      if (req.body) {
        // Variable for the object we will save
        const newNote = {
          title,
          text,
          id: nanoid(), //something... but this comma stays => // ,    
        };
  
        readAndAppend(newNote, './db/db.json');
  
  
  
        res.json(`note added successfully 🚀`);
        
        //return newNote;
      } else {
        res.json('Error in adding note');
      }
    }
  
  
  );
  



// GET Route for a specific note 
// eventally to pull to front, select out of list
// notes.get('/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/db.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         const result = json.filter((note) => notes.note_id === noteId);
//         return result.length > 0 ?
//           res.json(result) :
//           res.json('No note with that ID');
//       });
//   });

  
  // DELETE Route for a specific note
  notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    console.log(id);

    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

  module.exports = notes;