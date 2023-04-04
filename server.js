// Require neccessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');

// Require DB Configuration File
const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Require Route Files
const indexRouter = require('./routes/index');
const cardsRouter = require('./routes/cards');

// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on -  If the PORT environment variable is not set, the server will default to port 5000
const port = process.env.PORT || 5000;

/** Middleware */

// Add `bodyParser` middleware which will parse JSON
// requests into JavaScript Objects before they reach
// the route files.
//
// The method `.use` sets up middleware for Express apps.
app.use(express.json());

/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(cardsRouter);

// Start the server and listen for requests on the given port
app.listen(port, () => console.log(`listening on port ${port}`));