// Node dependancies 
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile)

// creating class to store notes
class Store {
    // read method
    read() {
        return readFile('db/db.json', 'utf-8');
    };

    // write method
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    };

    // get notes method
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // if no notes, send back empty array
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

        // get notes, add new note, write all notes again, return new note
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    };

    // delete note method
    deleteNote(id) {
        // get notes, remove the note with the corresponding id, write remaining notes again
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    };
};

module.exports = new Store();