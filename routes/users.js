// Require neccessary NPM Package
const express = require('express');
const { route } = require('.');

// Require Mongoose Model for Card
const User = require('./../models/user');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:          INDEX
 * Method:          GET
 * URI:             /api/users
 * Description:     Get all Users
 */
router.get('/api/users', (req, res) => {
    User.find()
    .then((user) => {
        if (user){
            res.status(200).json({ user: user[0].username});
        } else {
            res.status(404).json({user: 'Page Not Found'})
        }
    })
    .catch((error) => {
      res.status(500).json({ error: error});
    });
  });

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/users/:username
 * Description:     Get users by username
 */
router.get('/api/users/:username', (req, res) => {
    User.findOne({ username: req.params.username })
    .then((user) => {
        if (user) {
            res.status(200).json({user: user})
        } else {
            res.status(404).json({user: 'Page Not Found'})
        }
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/**
 * Action:          SHOW
 * Method:          GET
 * URI:             /api/users/:userID
 * Description:     Get users by id
 */
router.get('/api/users/:userID', (req, res) => {
    User.findById(req.params.userID)
    .then((user) => {
        if (user.length > 0) {
            res.status(200).json({user: user[0].username})
        } else {
            res.status(404).json({user: 'Page Not Found'})
        }
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/*
Action:        CREATE
Method:        POST
URI:        /api/user
Description:    Create A New User
*/
router.post('/api/users', (req, res) => {
    User.create(req.body.user)
    .then((newUser) => {
        res.status(201).json({user: newUser})
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

/*
Action:        UPDATE
Method:        PUT/PATCH
URI:        /api/user/:userID
Description:    Update user by user ID
*/
router.patch('/api/users/:userID', (req, res) => {
    User.findById(req.params.userID)
    .then((user) => {
        if (user) {
            return user.update(req.body.user)
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            })
        }
    })
    .then(() => {
        // If the update succeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error) => {
        res.status(500).json({ error: error });
    });
})

/*
Action:        DESTROY
Method:        DELETE
URI:        /api/user/:userID
Description:    Delete user via user id
*/
router.delete('/api/users/:userID', (req, res) => {
    User.findById(req.param.userID)
    .then((user) => {
        if (user) {
            return user.remove()
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesn\'t match any documents'
                }
            })
        }
    })
    .then(() => {
        res.status(204).end()
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
})

// Export the Router so we can use it in the `server.js` file
module.exports = router;