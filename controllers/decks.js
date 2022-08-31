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
  deleteCustom,
  deleteCard,
};

function show(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Deck.find({ type: req.params.deck }, function (err, char) {
    res.render("decks/show", {
      char: char,
      user: req.user,
    });
  });
}

function customShow(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Custom.findById( req.params.id , function(err, deck) {
    res.render('decks/custom', {
      user: req.user,
      deck: deck,
    })
  })
}

function newCust(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  res.render("decks/new", { user: req.user });
}

function custom(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  googleId = req.user.googleId
  req.body.owner = googleId;

  var deck = new Custom(req.body);
  deck.save(function (err) {
    if (err) return res.redirect("decks/new");
    res.redirect('users/show')
  });
}

function create (req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Custom.findById(req.params.id, function(err, custom) {
    custom.cards.push(req.body);
    custom.save(function(err) {
      res.redirect(`/decks/custom/${req.params.id}`)
    })
  })
}

function updateCustom(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Custom.findById(req.params.id, function(err, deck) {
    deck.name = req.body.name;
    deck.save()
    res.redirect(`/decks/custom/${req.params.id}`)
  })
}

function deleteCustom(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Custom.findByIdAndDelete(req.params.id, function(err, deck) {
  })
  console.log(Custom)
  res.redirect('/users/show')
}

function deleteCard(req, res) {
  if (!req.user) return res.redirect('/auth/google')
  Custom.findById(req.params.id, function(err, custom) {
    custom.cards.forEach(function(el, idx) {
      if (el.translation === req.params.card) {
        custom.cards.splice(idx, 1)
        custom.save()
      }
    });
    res.redirect(`/decks/custom/${req.params.id}`)
  })
}