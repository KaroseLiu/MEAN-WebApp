
'use strict';

var express = require('express');
var controller = require('../controller/card.controller');

var router = express.Router();


router.get('/', controller.showAllCards);
router.post('/', controller.createOneCard);
router.put('/:id', controller.updateOneCard);
router.delete('/:id', controller.deleteOneCard);

module.exports = router;
