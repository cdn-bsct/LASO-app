const Deck = require("../models/deck");
const User = require("../models/user");
const Custom = require('../models/custom');

module.exports = {
  show,
  new: newCust,
  custom,
  customShow,
  create,
  updateCustom,
};

function show(req, res) {
  Deck.find({ type: req.params.deck }, function (err, char) {
    res.render("decks/show", {
      char: char,
      user: req.user,
    });
  });
}

function customShow(req, res) {
  Custom.findById( req.params.id , function(err, deck) {
    res.render('decks/custom', {
      user: req.user,
      deck: deck,
    })
  })
}

function newCust(req, res) {
  res.render("decks/new", { user: req.user });
}

function custom(req, res) {
  googleId = req.user.googleId
  req.body.owner = googleId;

  var deck = new Custom(req.body);
  deck.save(function (err) {
    if (err) return res.redirect("decks/new");
    res.redirect('users/show')
  });
}

function create (req, res) {
  Custom.findById(req.params.id, function(err, custom) {
    custom.cards.push(req.body);
    custom.save(function(err) {
      res.redirect(`/decks/custom/${req.params.id}`)
    })
  })
}

function updateCustom(req, res) {
  Custom.findById(req.params.id, function(err, deck) {
    deck.name = req.body.name;
    deck.save()
    res.redirect(`/decks/custom/${req.params.id}`)
  })
}