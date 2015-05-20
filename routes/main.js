var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('../models/Card');

var Card = mongoose.model('Card');
/* GET home page. */

router.get('/cards', function(req, res, next) {
  Card.find(function(err, cards){
    if(err){ return next(err); }

    res.json(cards);
  });
});

router.post('/cards', function(req, res, next) {

	var card = new Card();

	card.name = req.body.name;
	card.description = req.body.description;
	card.type = req.body.type;
	card.status = req.body.status;
	card.deploymentState = req.body.deploymentState;
	card.libraries = req.body.libraries;
	card.appNode = req.body.appNode;

  card.save(function(err, cards){
    if(err){ return next(err); }
    res.json(cards);
  });
});

router.delete('/cards/:id', function(req, res, next) {

	Card.findById(req.params.id, function(err, card) {
      if(!card) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return card.remove(function(err) {
        if(!err) {
          console.log('Removed card');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
});

router.post('/cards/:id', function(req, res, next){

  Card.findById(req.params.id, function(err, card){

    if(!card) {
      res.statusCode = 404;
      return res.send({error: 'Not found!'});
    }

    if (req.body.name !== null) card.name = req.body.name;
    if (req.body.description !== null) card.description = req.body.description;
    if (req.body.type !== null) card.type = req.body.type;
    if (req.body.status !== null) card.status = req.body.status;
    if (req.body.deploymentState !== null) card.deploymentState = req.body.deploymentState;
    if (req.body.libraries !== null) card.libraries = req.body.libraries;
    if (req.body.appNode !== null) card.appNode = req.body.appNode;

    return card.save(function(err){
      if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', card: card});
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

      res.send(card);
    })
  })

})




module.exports = router;
