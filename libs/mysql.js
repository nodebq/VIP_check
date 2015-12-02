var Client = require('easymysql');
var config = require('../config.js');




var conn = null;


var link = function () {
    if(conn == null){
        conn = Client.create({
            'maxconnections' : 10
        });
        conn.addserver(config.mysql);
    }else{
        console.log('mysql is already runing');
    }
    conn.on('busy', function (quemysqluesize, maxconnections, which) {
        console.log('队列大小');
        console.log(quemysqluesize);
        console.log('最大连接数');
        console.log(maxconnections);
        console.log('错误');
        console.log(which);
    });
    return conn;
};


module.exports = link();