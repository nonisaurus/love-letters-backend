// Passport Package
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const mongoose = require('mongoose');


// Require our db config file
const db = require('../config/db');

// Establish db connection
mongoose.connect(db, { useNewUrlParser: true } );
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Passport Options
const jwtOptions = require('./passportOptions');

// JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy;

// The function to see if the requesting user has a valid JWT or not. 
// And, to see if the token is expired.
const strategy = new JwtStrategy(jwtOptions, (jwtPayLoad, next) => {
    if (User.findById(jwtPayLoad.id)) {
        next(null, User.findById(jwtPayLoad.id));
    } else {
        //If ID has no match then return 401 unauthorised
        NodeList(null, false);
    }
});

module.exports = strategy;