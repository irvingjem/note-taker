// Node modules
const express = require('express');
const router = express.Router();


// returns notes
router.get("/notes", (req, res) => {
    let newNote = req.body;
    let listNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLength = (noteList.length).toString();

    // 
    newNote.id = noteLength;
    // push note to list in the db.json
    listNote.push(newNote);

    // write the .json using stringify to the db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(listNote));
    res.json(listNote)
})

router.post("/api/notes", (req, res) => {});

// Delete note based on id that is assigned to it
router.delete("/api/notes/:id", (req, res) => {
    let listNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    // filter through ids so there are not duplicates
    listNote = listNote.filter(selected => {
        return selected.id != noteId;
    })

    // then update the .json data so the note is correctly displayed
    fs.writeFileSync("./db/db.json", JSON.stringify(listNote));
    res.json(listNote);
})

module.exports = router;