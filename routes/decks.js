var express = require('express');
var router = express.Router();
const decksCtrl = require('../controllers/decks')


// hira - kata - adj - verbs **routes to be done**
router.get('/new', decksCtrl.new)
router.get('/custom/:id', decksCtrl.customShow)
router.get('/:deck', decksCtrl.show)

router.put('/:id', decksCtrl.updateCustom)

router.post('/', decksCtrl.custom)
router.post('/:id', decksCtrl.create)


module.exports = router;