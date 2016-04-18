var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var conn = require('../libs/mysql.js');
var config = require('../config.js');
var http = require('http');


var new2016 = {
    name : '招新报名接口'
};


new2016.do = function (req, res) {
    //console.log(req.query);
    
    console.log('10');
    if(req.query.name&&req.query.year.length==1&&req.query.gender.length==1&&req.query.phone.length==11&&(req.query.from.length==1||req.query.from.length==2)){
        if(!req.query.other){
            req.query.other='';
        }
        conn.new().query({
            sql:'select * from fy_2016 where other=:other and phone=:phone',
            params:{
                other:req.query.other,
                phone:req.query.phone
            }
        }, function (e, r) {
            //console.log(11);
            if(e){
                console.log(e);
                console.log('can not access fy_new');
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                if(r.length){
                    console.log('data redundancy');
                    res.end(fyscu.out(code.dataRedundancy));
                    return;
                }else{
                    //console.log("insert into fy_2016 (name,from,phone,gender,other,year) values ('"+req.query.name+"','"+code.college[req.query.from]+"','"+req.query.phone+"','"+req.query.gender+"','"+req.query.other+"','"+code.year[req.query.year]+"')");
                    conn.new().query({
                        sql:'insert into fy_2016 (`name`,`from`,`phone`,`gender`,`other`,`year`) values (:name,:from,:phone,:gender,:other,:year)',
                        params:{
                            name:req.query.name,
                            from:code.college[req.query.from],
                            phone:req.query.phone,
                            gender:req.query.gender,
                            other:req.query.other,
                            year:code.year[req.query.year]
                        }
                    }, function (ee, rr) {
                        //console.log(12);
                        if(ee){
                            console.log(ee);
                            console.log('can not access fy_new');
                            res.end(fyscu.out(code.mysqlError));
                            return;
                        }else {
                            console.log('success');
                            res.end(fyscu.out(code.success));
                            //调用通知接口


                            if(req.query.gender == 0){
                                var aaa = '女';
                            }else {
                                var aaa = '男';
                            }

                            var request = http.request({
                                host:'mailapi.fyscu.com',
                                path:'/mail?email=471597503@qq.com&title='+req.query.name+'['+aaa+']在飞扬研发2016招新系统上填写了报名表单&content='+req.query.other
                            },function (res) {
                                loadData(res, (err, buf) => {
                                    if (err) {
                                        console.error(err.stack);
                                        return;
                                    }
                                    var json = JSON.parse(buf.toString('utf8'));
                                    console.log(json);
                                });
                            });

                            request.on('error', (e) => console.error(e.stack));
                            request.end(null);



                            return;
                        }
                    })
                }
            }
        })
    }else{
        console.log('paramError');
        res.end(fyscu.out(code.paramError));
        return;
    }
    //console.log(code.college[req.query.college]);
    //return;
};


new2016.select = function (req, res) {
    if(1){
        conn.new().query({
            sql:'select `id`,`name`,`gender`,`phone`,`from`,`year`,`presence`,`score` from fy_2016 order by `presence` desc'
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                res.end(fyscu.out(r));
                return;
            }
        })

    }else{
        res.end(fyscu.out(code.success));
        return;
    }
};


new2016.getUserInfo = function (req, res) {
    if(req.query.id){
        conn.new().query({
            sql:'select * from fy_2016 where id=:id',
            params:{
                id:req.query.id
            }
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                res.end(fyscu.out(r[0]));
                return;
            }
        })
    }else {
        res.end(fyscu.out(code.paramError));
        return;
    }
};


new2016.updateEvaluation = function (req, res) {
    if(req.query.id&&(req.query.presence==0||req.query.presence==1||req.query.presence==2)){
        if(!req.query.evaluation){
            req.query.evaluation = ''
        }
        if(!req.query.score){
            var sql = 'update fy_2016 set evaluation=:evaluation,presence=:presence where id=:id'
        }else {
            var sql = 'update fy_2016 set evaluation=:evaluation,presence=:presence,score=:score where id=:id'
        }
        conn.new().query({
            sql:sql,
            params:{
                id:req.query.id,
                evaluation:req.query.evaluation,
                presence:req.query.presence,
                score:req.query.score
            }
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else {
                res.end(fyscu.out(code.success));
            }
        })
    }else{
        res.end(fyscu.out(code.paramError));
        return;
    }
};


new2016.checkIn = function (req, res) {
    console.log(req.query.name&&req.query.phone);
    if(req.query.name&&req.query.phone){
        conn.new().query({
            sql:'select presence from fy_2016 where name=:name and phone=:phone',
            params:{
                name:req.query.name,
                phone:req.query.phone
            }
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else {
                if(r.length){
                    if(r[0].presence==0){
                        conn.new().query({
                            sql:'update fy_2016 set presence=2 where name=:name and phone=:phone',
                            params:{
                                name:req.query.name,
                                phone:req.query.phone
                            }
                        }, function (ee, rr) {
                            console.log(ee);
                            res.end(fyscu.out(code.success));
                            return;
                        })
                    }else {
                        res.end(fyscu.out(code.dataRedundancy));
                        return;
                    }
                }else {
                    res.end(fyscu.out(code.paramError));
                    return;
                }
            }
        })
    }else {
        res.end(fyscu.out(code.paramError));
        return;
    }
};


module.exports = new2016;

function loadData(stream, callback) {
    var bufs = [];
    stream.on('data', chunk => bufs.push(chunk));
    stream.on('end', () => callback(null, Buffer.concat(bufs)));
    stream.on('error', e => callback(e, null));
}