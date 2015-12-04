var Client = require('easymysql');
var config = require('../config.js');
var conn1 = null;
var conn2 = null;
var link = {};
link.check = function () {//连接飞扬会员基础数据
    if(conn1 == null){
        conn1 = Client.create({
            'maxconnections' : 10
        });
        conn1.addserver(config.fy_vip_base);
    }else{
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
    if(conn2 == null){
        conn2 = Client.create({
            'maxconnections': 10
        });
        conn2.addserver(config.fy_repair);
    }else{
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
module.exports = link;