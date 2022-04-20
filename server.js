// Node modules
const express = require("express");
const fs = require("fs");
const routeApi = require('./routes/apiRoutes');
const routeHtml = require('./routes/htmlRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware and routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', routeApi);
app.use('/', routeHtml);

// err response for bad requests
app.use((req, res) => {
    res.status(404).end();
});


// Listener for server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});