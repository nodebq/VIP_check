var express = require('express');
var router = express.Router();
var check = require('../controller/check.js');
var new2016 = require('../controller/new.js');

/* GET home page. */

//router.all('*', function (req, res, next) {
//
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//    res.setHeader("X-Powered-By",' 3.2.1');
//    res.setHeader("Content-Type", "application/json;charset=utf-8");
//
//    next();
//});

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


router.get('/check', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    check.do(req,res);
});

router.get('/new', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    new2016.do(req,res);
});

router.get('/select', function (req, res) {
    //res.header("Access-Control-Allow-Origin","*");
    new2016.select(req,res);
});

module.exports = router;
