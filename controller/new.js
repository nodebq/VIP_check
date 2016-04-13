var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var conn = require('../libs/mysql.js');
var config = require('../config.js');


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
            sql:'select `id`,`name`,`gender`,`phone`,`from`,`year`,`presence`,`score` from fy_2016'
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
    if(req.query.userId){
        conn.new().query({
            sql:'select * from fy_2016 where id=:userId',
            params:{
                userId:req.query.userId
            }
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
    }else {
        res.end(fyscu.out(code.paramError));
        return;
    }
};


new2016.updateEvaluation = function (req, res) {
    if(req.query.userId){
        if(!req.query.evaluation){
            req.query.evaluation = ''
        }
        conn.new().query({
            sql:'update fy_2016 set evaluation=:evaluation where id=:id',
            params:{
                id:req.query.userId,
                evaluation:req.query.evaluation
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
                            sql:'update fy_2016 set presence=1 where name=:name and phone=:phone',
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