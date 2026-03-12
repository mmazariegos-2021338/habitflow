var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('Habitos API');
});

module.exports = router;
