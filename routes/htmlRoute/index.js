// Node modules
const express = require('express');
const path = require('path');
const router = express.Router();

// Stored class
const store = require('../../db/notes-store')

// finds notes file to send notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// route for index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;