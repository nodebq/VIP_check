var fyscu = {
    'name':"处理模块"
};


fyscu.format = function (code, message, data) {
    var o = {};
    o.code = code;
    if(message){
        o.message = message;
    }
    if(data){
        o.data = data;
    }
    return JSON.stringify(o);
};

fyscu.out = function (o) {
    return JSON.stringify(o);
};

module.exports = fyscu;