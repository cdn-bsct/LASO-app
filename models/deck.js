const mongoose = require('mongoose')
const Schema = mongoose.Schema

var deckSchema = new Schema ({
    character: String,
    translation: String,
    type: String,
})

var customSchema = new Schema ({
    name: String,
    owner: String,
    cards: [deckSchema],
})

module.exports = mongoose.model('Decks', deckSchema)