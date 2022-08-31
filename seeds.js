require('dotenv').config()
require('./config/database')

const Deck = require('./models/deck')
const data = require('./data')


async function seedDeck() {
   await Deck.deleteMany({}) 
   console.log('finish delete')
   await Deck.create(data.decks)
   console.log('finish create')
}

seedDeck();