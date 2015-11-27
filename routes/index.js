var express = require('express');
var router = express.Router();
var check = require('../controller/check.js')

/* GET home page. */

router.get('/check', function (req, res) {
  check.do(req,res);
});





module.exports = router;
