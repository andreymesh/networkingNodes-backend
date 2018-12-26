var express = require('express');
var router = express.Router();
var models = require('../models/index')

/* GET home page. */
router.get('/', function(req, res) {
  models.NetworkNodes.findAll({}).then(function(networkNodes) {
    res.json(networkNodes);
  });
});

router.post('/',function(req, res){
  const body = req.body;
  models.NetworkNodes.create({...body}).then(function(networkNodes) {
    res.json(networkNodes);
  });
})

router.delete('/:id', function(req, res) {
  models.NetworkNodes.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.json(true);
  });
});

module.exports = router;
