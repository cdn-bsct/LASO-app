const mongoose = require('mongoose')
const Schema = mongoose.Schema


var customSchema = new Schema ({
    name: String,
    owner: String,
    character: String,
    translation: String,
    type: String,
    cards: []
})

module.exports = mongoose.model('Customs', customSchema)