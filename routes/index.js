var express = require('express');
var router = express.Router();
var check = require('../controller/check.js');

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

router.get('/check', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    check.do(req,res);
});








module.exports = router;
