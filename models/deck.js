const mongoose = require('mongoose')
const Schema = mongoose.Schema

var deckSchema = new Schema ({
    character: String,
    translation: String,
    type: String,
})

module.exports = mongoose.model('Decks', deckSchema)