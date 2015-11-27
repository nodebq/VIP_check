var express = require('express');
var router = express.Router();
var check = require('../controller/check.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '飞扬会员验证系统' });
});

router.get('/check', function (req, res) {
  check.do(req,res);
});

module.exports = router;
