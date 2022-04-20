// Node dependancies 
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)

// creating class to store notes
class Store {
    // read function
    read() {
        return readFile('db/db.json', 'utf-8');
    };

    // write function
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    };

    // get function
    notesGet() {
        return this.read().then((notes) => {
            let parsedNotes;

            // if nothing saved send back empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    };

    // adding note function for indexs to call
    addNote(note) {
        // deconstuct note to making into seperate variables
        const { title, text } = note;

        const newNote = { title, text };

        // get notes, add new note, write all notes again, return new note
        return this.notesGet()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    };

    // delete note function
    deleteNote(id) {
        // get notes, remove the note based off id, write notes again
        return this.notesGet()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    };
};

module.exports = new Store();