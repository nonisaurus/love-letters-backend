// Require necessary NPM Package
const express = require('express');
const passport = require('passport');

// Require Mongoose Model for Card
const Card = require('./../models/card');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// import seed data
const cardsSeed = require('../seed');

/**
 * Action:          INDEX
 * Method:          GET
 * URI:             /api/cards
 * Description:     Get all Cards
 */
router.get('/api/cards', (req, res) => {
  Card.find()
    // Return all Cards as an Array
    .then((cards) => {
      res.status(200).json({ cards: cards });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/cards/:id
 * Description:     Get a Card by Card ID
 */
router.get('/api/cards/:id', (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).json({ card: card });
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    // Catch any error that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

/**
 * Action:          CREATE
 * Method:          POST
 * URI:             /api/cards
 * Description:     Create a new Card
 */
router.post('/api/cards', (req, res) => {
  console.log({ cardsSeed });
  Card.insertMany(cardsSeed)
    .then((createdCards) => {
      res.status(201).json({ cards: createdCards });
    })
    // Catch any error that might occur
    .catch((error) => {
      console.log('error in create >>>', error);
      res.status(500).json({ error: error });
    });
});

/**
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             /api/cards/:id
 * Description:     Delete a card by ID
 */
router.delete('/api/cards/:id', (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      console.log('card:', card);
      if (card) {
        // Pass the result of Mongoose's `.deleteOne` method to the next `.then`
        return card.deleteOne();
      } else {
        // If we couldn't find a document with the matching ID
        res.status(404).json({
          error: {
            name: 'DocumentNotFoundError',
            message: 'The provided ID doesn\'t match any documents'
          }
        });
      }
    })
    .then(() => {
      // If the deletion succeeded, return 204 and no JSON
      res.status(204).end();
    })
    // Catch any error that might occur
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

// Export the Router so we can use it in the `server.js` file
module.exports = router;
