// Require neccessary NPM Package
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

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
            res.status(200).json({ user: user});
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
 * URI:             /api/user/:userID
 * Description:     Get users by id
 */
router.get('/api/user/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.id)
    .then((user) => {
       if (user) {
            res.status(200).json({user: user})
        } else {
            res.status(404).json({user: 'Page Not Found'})
        }
    })
    .catch((error) => {
        console.log('CATCH error>>>', error)
        res.status(500).json({error: error})
    })
})

/*
Action:        CREATE
Method:        POST
URI:        /api/user
Description:    Create A New User
*/
const saltRounds = 10;
router.post('/api/user', (req, res) => {
    if (req.body.username.length >=6 && req.body.username.length <=20 && req.body.password.length >= 6 && req.body.password.length <=20) {
    const { username, password } = req.body
    bcrypt.hash(password, saltRounds).then((hash) => {
        User.create({
            username: username,
            password: hash
        })
    })
    // User.create(req.body)
    .then((newUser) => {
        res.status(201).json({user: newUser})
    })
    .catch((error) => {
        res.status(500).json({error: error})
    })
    } else {
        res.status(406).json({ error: {
            name: 'UsernameAndPasswordLengthsWrong',
            message: 'Username and Password must be between 8-20 characters'
        }})
    }
})

/*
Action:        UPDATE
Method:        PUT/PATCH
URI:        /api/user/:userID
Description:    Update user by user ID
*/
router.patch('/api/users/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.userID)
    .then((user) => {
        if (user) {
            return user.updateOne(req.body.user)
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
Action:         DESTROY
Method:         DELETE
URI:            /api/user/:userID
Description:    Delete user via user id
*/
router.delete('/api/user/:userID', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById(req.params.userID)
    .then((user) => {
        if (user) {
            return user.deleteOne()
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