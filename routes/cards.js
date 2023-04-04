// Require neccessary NPM Package
const express = require('express');

// Require Mongoose Model for Card
const Card = require('./../models/card');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

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
    // Catch any errors that might occure
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             
 * Description:     Get a Card by Card ID
 */
router.get('/api/cards/:id', (req, res) => {
    Card.findById(req.params.id)
      .then((cards) => {
        if (cards) {
          res.status(200).json({ cards: cards });
        } else {
          // If we coudn't find a document with the matching ID
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
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             
 * Description:     Delete a Card by Card ID
 */
router.delete('/api/cards/:id', (req, res) => {
    Card.findById(req.params.id)
      .then((card) => {
        if (card) {
          // Pass the result of Mongoose's `.remove` method to the next `.then`
          return card.remove();
        } else {
          // If we coudn't find a document with the matching ID
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
        res.status(500).json({ error: error });
      });
  });
  
  /**
   * Action:          UPDATE
   * Method:          PATCH/PUT
   * URI:             
   * Description:     Update a Card by Card ID
   */
  router.patch('/api/cards/:id', (req, res) => {
    Card.findById(req.params.id)
      .then((card) => {
        if (card) {
          // Pass the result of Mongoose's `.update` method to the next `.then`
          return card.update(req.body.card);
        } else {
          // If we coudn't find a document with the matching ID
          res.status(404).json({
            error: {
              name: 'DocumentNotFoundError',
              message: 'The provided ID doesn\'t match any documents'
            }
          });
        }
      })
      .then(() => {
        // If the update succeded, return 204 and no JSON
        res.status(204).end();
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
    Card.create(req.body.cards)
    // On a successfull `create` action, respond with 201
    // HTTP status and the conent of the new Card.
    .then((newCard) => {
      res.status(201).json({ newCard: newCard });
    })
    // Catch any error that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });

// Export the Router so we can use it in the `server.js` file
module.exports = router;