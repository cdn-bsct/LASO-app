const User = require('../models/user')

module.exports = {
    show,
}

function show(req, res) {
    if (!req.user) {
        return res.redirect('/auth/google')
    } else {
        console.log(req.user)
        User.findById(req.user._id, function(err, user) {
            res.render('users/show', { user: user })
        })

    }
}