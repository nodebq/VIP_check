//var Client = require('easymysql');
var Client = require('fy-mysql');
var config = require('../config.js');
var conn1 = null;
var conn2 = null;
var conn3 = null;
var link = {};
link.check = function () {//连接飞扬会员基础数据
    if (conn1 == null) {
        conn1 = Client.create({
            'maxconnections': 10
        });
        conn1.addserver(config.fy_vip_base);
    } else {
        console.log('conn1 is already running');
    }
    conn1.on('busy', function (quemysqluesize, maxconnections, which) {
        console.log('队列大小');
        console.log(quemysqluesize);
        console.log('最大连接数');
        console.log(maxconnections);
        console.log('错误');
        console.log(which);
    });
    return conn1;
};
link.update = function () {
    //连接飞扬用户表
    if (conn2 == null) {
        conn2 = Client.create({
            'maxconnections': 10
        });
        conn2.addserver(config.fy_repair);
    } else {
        console.log('conn2 is already running');
    }
    conn2.on('busy', function (quemysqluesize, maxconnections, which) {
        console.log('队列大小');
        console.log(quemysqluesize);
        console.log('最大连接数');
        console.log(maxconnections);
        console.log('错误');
        console.log(which);
    });
    return conn2;
};
link.new = function () {
    //连接2016年招新报名数据库
    //console.log(conn3);
    //console.log('1');
    if (conn3 == null) {
        conn3 = Client.create({
            'maxconnections': 10
        });
        conn3.addserver(config.fy_new);
    } else {
        console.log('conn3 is already running');
    }
    conn3.on('busy', function (quemysqluesze, maxconnections, which) {
        console.log('队列大小');
        console.log(quemysqluesize);
        console.log('最大连接数');
        console.log(maxconnections);
        console.log('错误');
        console.log(which);
    });
    return conn3;
};
module.exports = link;