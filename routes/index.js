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

router.get('/', function(req, res) {//把主页指向会员验证
    res.render('index', { title: 'Express' });
});


router.get('/check', function (req, res) {//会员验证接口
    res.header("Access-Control-Allow-Origin", "*");
    check.do(req,res);
});

router.get('/new', function (req, res) {//2016年招新表单提交接口
    res.header("Access-Control-Allow-Origin", "*");
    new2016.do(req,res);
});

router.get('/api/user', function (req, res) {//2016年招新后台用户列表
    res.header("Access-Control-Allow-Origin","*");
    new2016.select(req,res);
});
router.get('/api/userInfo', function (req, res) {//2016年招新后台个人详细信息
    res.header("Access-Control-Allow-Origin","*");
    new2016.getUserInfo(req,res);
});
router.get('/api/evaluation', function (req, res) {//2016年招新后台提交接口
    res.header("Access-Control-Allow-Origin","*");
    new2016.updateEvaluation(req,res);
});
router.get('/checkIn', function (req, res) {//2016年签到接口
    res.header("Access-Control-Allow-Origin","*");
    new2016.checkIn(req,res);
});


module.exports = router;
