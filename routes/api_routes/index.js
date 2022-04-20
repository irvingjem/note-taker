// Node modules
const express = require('express');
const router = express.Router();


// returns notes
router.get("/notes", (req, res) => {
    // getting saved notes 
    store.notesGet()
        .then((notes) => {
            // get notes in .json format
            return res.json(notes)
        })
        // error catcher
        .catch((err) => res.status(500).json(err));

})

// post notes to note html
router.post("/notes", (req, res) => {
    // adding note function
    store.noteAdd(req.body)
        //writes the note as .json 
        .then((note) => res.json(note))
});

// Delete note from stored
router.delete("/notes/:id", (req, res) => {
    // checks the stored notes by id and deletes by id
    store.deleteNote(req.params.id)
        .then((notes) => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
})

module.exports = router;