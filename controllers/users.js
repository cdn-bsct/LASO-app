const User = require('../models/user')
const Deck = require('../models/deck')
const Custom = require('../models/custom')

module.exports = {
    show,
}

function show(req, res) {
    googleId = req.user.googleId
    if (!req.user) {
        return res.redirect('/auth/google')
    } else {
        User.findById(req.user._id, function(err, user) {
            Custom.find({ owner: googleId }, function(err, custom) {
                res.render('users/show', { user: user, custom: custom })
            })
        })

    }
}