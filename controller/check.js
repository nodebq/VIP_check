var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');
var conn = require('../libs/mysql.js')



var check = {
    name:"验证逻辑"
};


check.do = function (req,res) {

    if(req.query.name&&req.query.phone.length==11&&req.query.vid&&(req.query.gender==1||req.query.gender==0)){

        //console.log(req.query.name);
        //console.log(req.query.phone);
        //console.log(req.query.vid);
        //console.log(req.query.gender);

        conn.query({
            sql:'select * from fy_vip_base where name=:name and phone=:phone and gender=:gender and vip_num=:vid',
            params:{
                name:req.query.name,
                phone:req.query.phone,
                gender:req.query.gender,
                vid:req.query.vid
            }
        }, function (e, r) {
            if(e){
                console.log(e);
                res.end(fyscu.out(code.mysqlError));
                return;
            }else{
                //console.log(r);
                //console.log('success');
                if(r.length!=0){
                    console.log('验证通过');
                    res.end(fyscu.out(code.success));
                    //todo 修改会员数据
                    return;
                }else{
                    res.end(fyscu.out(code.checkFailed));
                    console.log('验证未通过');
                    return;
                }
            }
        });
        //res.end(fyscu.out(code.success));
        //return;
    }else{
        res.end(fyscu.out(code.checkPhoneFailed));
        return;
    }



};

module.exports = check;