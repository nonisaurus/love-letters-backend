// Require neccessary NPM Packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Require Auth Related Packages
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Require DB Configuration File
const db = require('./config/db');

// Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Require Passport Strategy and Options
const strategy = require('./lib/passportStrategy');
const jwtOptions = require('./lib/passportOptions');

const saltRounds = 10;

// Require Route Files
const indexRouter = require('./routes/index');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const messageRouter = require('./routes/messages');
const authRouter = require('./routes/auth');


// Instantiate Express Application Object
const app = express();

// Define PORT for the API to run on -  If the PORT environment variable is not set, the server will default to port 5000
const port = process.env.PORT || 5000;
const reactPort = 3000;

/** Middleware */
// The method `.use` sets up middleware for Express apps.
app.use(express.json());

// Set CORS headers on responses from this API using 'cors' NPM package
app.use(cors(
  {
    origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }
  ));

// Define auth strategy from before - mount this strategy
passport.use(strategy);

/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(cardsRouter);
app.use(usersRouter);
app.use(messageRouter);
  
// Authentication
app.use(authRouter);


// Start the server and listen for requests on the given port
app.listen(port, () => console.log(`listening on port ${port}`));