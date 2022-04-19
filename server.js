// Node modules
const express = require("express");
const fs = require("fs");
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Route for notes file
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route for .json reading
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// route for main page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});







// Listener for server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});