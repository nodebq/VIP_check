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
    if(req.query.a == config.selectAction&&req.query.b == config.selectActionDo){
        conn.new().query({
            sql:'select * from fy_2016'
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                var data = [];
                var item = {};
                abc(0);
                function abc(i) {
                    //console.log(i);
                    //console.log(r[i]);
                    item.id = r[i].id;
                    item.name = r[i].name;
                    item.from = r[i].from;
                    item.phone = r[i].phone;
                    item.gender = r[i].gender;
                    item.other = r[i].other;
                    item.year = r[i].year;
                    data.push(item);
                    //console.log(data);
                    if(i < r.length-1){
                        i++;
                        abc(i);
                    }
                    return;
                }
                //console.log(data);
                res.end(fyscu.out(data));
                return;
            }
        })

    }else{
        res.end(fyscu.out(code.success));
    }
};










module.exports = new2016;