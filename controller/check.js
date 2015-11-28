var fyscu = require('../libs/fyscu.js');
var code = require('../libs/code.js');



var check = {
    name:"验证逻辑"
};


check.do = function (req,res) {

    if(req.query.name&&req.query.phone.length==11&&req.query.vid&&(req.query.gender==1||req.query.gender==0)){

        console.log(req.query.name);
        console.log(req.query.phone);
        console.log(req.query.vid);
        console.log(req.query.gender);

        res.end(fyscu.out(code.success));
        return;
    }else{
        res.end(fyscu.out(code.checkPhoneFailed));
        return;
    }



};

module.exports = check;