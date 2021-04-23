const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res)=> res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res)=> {return res.json(notes)} );

app.delete("/api/notes/:id", (req, res)=>{
    const id = req.params.id;
    for(var i = 0; i < notes.length; i++) {
         (notes[i].id == id) ? notes.splice(i, 1) : false ;
         break;
    }
    return res.json(notes);
  });

app.post('/api/notes', (req,res) => {
    const newNote = req.body;
    newNote.id = Math.floor((Math.random() * 100) + 1);
    notes.push(newNote);
    return res.json(newNote);
})

app.listen(PORT, () => {console.log(`App listening on PORT: ${PORT}`)})