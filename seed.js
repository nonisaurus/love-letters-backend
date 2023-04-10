const mongoose = require('mongoose')
const db = require('./config/db')

const User = require('./models/user')
const Card = require('./models/card')

mongoose.connect(db, { useNewUrlParser: true } );
mongoose.connection.once('open', () => {console.log('Connected to MongoDB >>> seed')});

const cards = [
    {
        "name":"Princess",
        "score": "8",
        "effect": "If the player plays or discards this card for any reason, they are eliminated from the round.",
        "quantity":"1"
    },
    {
        "name":"Countess",
        "score": "7",
        "effect": "If the player holds this card and either the King or the Prince, this card must be played immediately, which otherwise does nothing.",
        "quantity":"1"
    },
    {
        "name":"King",
        "score": "6",
        "effect": "Player may trade hands with another player.",
        "quantity":"1"
    },
    {
        "name":"Prince",
        "score": "5",
        "effect": "Player may choose any player (including themselves) to discard their hand and draw a new one.",
        "quantity":"2"
    },
    {
        "name":"Handmaid",
        "score": "4",
        "effect": "Player cannot be affected by any other player's cards until their next turn.",
        "quantity":"2"
    },
    {
        "name":"Baron",
        "score": "3",
        "effect": "Player may choose another player and privately compare hands. The player with the lower-value card is eliminated from the round.",
        "quantity":"2"
    },
    {
        "name":"Priest",
        "score": "2",
        "effect": "Player may privately see another player's hand.",
        "quantity":"2"
    },
    {
        "name":"Guard",
        "score": "1",
        "effect": "Player may choose another player and name a card other than Guard. If the chosen player's hand contains that card, that player is eliminated from the round.",
        "quantity":"5"
    }
]

Card.insertMany(cards, (error, cards) => {
    if (error) {
        res.status(500).json( { error: error })
    } else {
        res.status(201).json( { cards: cards })
    }
})