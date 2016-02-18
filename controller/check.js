var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var conn = require('../libs/mysql.js');



var check = {
    name:"验证逻辑"
};


check.do = function (req,res) {
    console.log(req.query.name);

    if(req.query.name&&req.query.phone.length==11&&req.query.vip_num&&(req.query.gender==1||req.query.gender==0)){

        //console.log(req.query.name);
        //console.log(req.query.phone);
        //console.log(req.query.vid);
        //console.log(req.query.gender);


        conn.check().query({
            sql:'select * from fy_vip_base where name=:name and phone=:phone and gender=:gender and vid=:vid',
            params:{
                name:req.query.name,
                phone:req.query.phone,
                gender:req.query.gender,
                vid:req.query.vip_num
            }
        }, function (e, r) {
            if(e){
                console.log(e);
                console.log('can not access fy_vip_base');
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                //console.log(r);
                //console.log('success');
                if(r.length){
                    console.log('check success and will update');
                    //res.send(fyscu.out(code.success));
                    //console.log('success');return;
                    conn.update().query({
                        sql:'select user_id from fy_userextend where name =:name',
                        params:{
                            name: r[0].name
                        }
                    }, function (ee, rr) {
                        //console.log('select user_id from fy_userextend where name = '+r[0].name);return;
                        if(ee){
                            console.log(ee);
                            console.log('can not access fy_user');
                            res.end(fyscu.out(code.mysqlError));
                            return;
                        }else{
                            //查询成功userid
                            //console.log(rr[0].user_id);
                            if(rr[0].user_id){
                                //res.end(fyscu.out(code.success));
                                conn.update().query({
                                    sql:'select type from fy_user where user_id=:id',
                                    params:{
                                        id:rr[0].user_id
                                    }
                                }, function (eeee, rrrr) {
                                    if(eeee){
                                        console.log(eeee);
                                        res.end(fyscu.out(code.mysqlError));
                                        return;
                                    }else{
                                        if(rrrr[0].type){
                                            //特殊人群
                                            res.end(fyscu.out(code.alreadyVip));
                                            console.log('already VIP STAFF ADMIN');
                                            return;
                                        }else{
                                            //非特殊人群
                                            conn.update().query({
                                                sql:'update fy_user set type=:type where user_id=:id',
                                                params:{
                                                    type:1,
                                                    id:rr[0].user_id
                                                }
                                            }, function (eee, rrr) {
                                                if(eee){
                                                    console.log(ee);
                                                    res.end(fyscu.out(code.mysqlError));
                                                    return;
                                                }else{
                                                    console.log('everything is good');
                                                    res.end(fyscu.out(code.success));
                                                    return;
                                                }
                                            })
                                        }
                                    }
                                });
                            }else{
                                console.log('check success but fyscu have not data');
                                res.end(fyscu.out(code.checkSuccess));
                                return;
                            }
                        }
                    });

                    //return;
                }else{
                    res.end(fyscu.out(code.checkFailed));
                    console.log('check failed');
                    return;
                }
            }
        });
        //res.end(fyscu.out(code.success));
        //return;
    }else{
        console.log('check params failed');
        res.end(fyscu.out(code.checkPhoneFailed));
        return;
    }
//todo 添加log文件

};

module.exports = check;