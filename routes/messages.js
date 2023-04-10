// Require neccessary NPM Package
const express = require('express');
const passport = require('passport');


// Require Mongoose Model for Article
const Message = require('../models/message')

// Instantiate a Router
const router = express.Router()

/**
 * Action:          INDEX
 * Method:          GET
 * URI:             /api/message
 * Description:     Get all messages
 */
router.get('/api/messages', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.find()
    // to use _id from User schema that was referenced as userId in Message schema
    .populate('userId')
    // Return all messages as an array
    .then((message) => {
      res.status(200).json({ message: message });
    })
    // Catch any errors that might occure
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/message/:id
 * Description:     Get a messages by its ID
 */
router.get('/api/messages/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.findById(req.params.id)
    .populate('userId')
    .then((message) => {
        if (message) {
            res.status(200).json({message: message})
        } else {
            res.status(404).json({
                error: {
                    name: 'BadRequest',
                    message: `The provided ID doesn't match any documents`
                }
            })
        }
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:          CREATE
 * Method:          POST
 * URI:             /api/message
 * Description:     Create a message
 */
router.post('/api/message', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.create(req.body.message)
    .then((message) => {
        res.status(201).json({message: message})
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:          UPDATE
 * Method:          PATCH/PUT
 * URI:             /api/message/:id
 * Description:     Update a message by its ID
 */
router.put('/api/messages/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.findById(req.params.id)
    .then((message) => {
        if (message) {
            return message.updateOne(req.body.message)
        } else {
            res.status(404).json({
                error: {
                    name: 'BadRequest',
                    message: `The provided ID doesn't match any documents`
                }
            })
        }
    })
    .then(() => {
        // if update succeded, return 204 and no JSON
        res.status(204).end()
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
})

/**
 * Action:          DESTROY
 * Method:          DELETE
 * URI:             /api/message/:id
 * Description:     Delete a message by its ID
 */
router.delete('/api/messages/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Message.findById(req.params.id)
      .then((message) => {
        console.log('message:', message);
        if (message) {
          // Pass the result of Mongoose's `.remove` method to the next `.then`
          return message.deleteOne();
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
        console.log(error)
        res.status(500).json({ error: error });
      });
  });


// Export the Router so we can use it in the `server.js` file
module.exports = router; 