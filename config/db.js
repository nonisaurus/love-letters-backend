const dotenv = require('dotenv');
dotenv.config()

// Creating a base name for the MongoDB
const mongooseBaseName = 'loveletters';

// Create the MongoDB URI for Development and Test
const database = {
    development: `mongodb://localhost:27017/${mongooseBaseName}-development`,
    test: `mongodb://localhost:27017/${mongooseBaseName}-test`
  };

// Indentify if development environment is Test or Development
// Select a Database based on whether a test file was executed before `server.js`
const localDB = process.env.EXPRESS_PORT ? database.test : database.development;

// Environment variable MONGODB_URI will be avaiable in
// Heroku production environment. Otherwise use Test or
// Development database.
const currentDB = process.env.MONGODB_URI || localDB;

// Export the approprate database based on the current environment
module.exports = currentDB; 