var code = {
    //返回码格式:第一位为系统级返回码,2为业务级返回码,后三位具体代码
    'success': {
        code: 200,
        message: "success"
    },
    'test': {
        code: 1001,
        message: "test"
    },
    'mysqlError': {
        code: 1002,
        message: "数据库访问错误"
    },
    'paramError': {
        code: 1003,
        message: "参数错误"
    },
    'requsetError': {
        code: 1004,
        message: "请求错误"
    },
    'cannotSupportAjax': {
        code: 1005,
        message: "不支持xhr对象"
    },
    'loginError': {
        code: 2001,
        message: "并未获取授权"
    },
    'loginNotFinished': {
        code: 2002,
        message: "有一些重要信息还没有载入完成"
    },
    '404NotFound': {
        code: 2003,
        message: "没有找到这个人"
    },
    'updateNotChanged': {
        code: 2004,
        message: "数据并没有改动"
    },
    'checkFailed': {
        code: 2005,
        message: "认证失败"
    },
    'checkPhoneFailed': {
        code: 2006,
        message: "信息输入有误"
    },
    'checkSuccess': {
        code: 2007,
        message: "您并不是报修系统成员"
    },
    'alreadyVip': {
        code: 2008,
        message: "您已经是会员了"
    },
    'dataRedundancy':{
        code:2009,
        message:'表单数据重复'
    }

};

var college = [
    "",
    "软件学院",
    "计算机学院",
    "电子信息学院",
    "电气信息学院",
    "数学学院与经济学院",
    "空天科学与工程学院",
    "高分子科学与工程学院",
    "材料科学与工程学院",
    "制造科学与工程学院",
    "建筑与环境学院",
    "水利水电学院",
    "化学工程学院",
    "轻纺与食品学院",
    "法学院",
    "艺术学院",
    "经济学院",
    "文学与新闻学院",
    "外国语学院",
    "历史文化学院（旅游学院）",
    "马克思主义学院（政治学院）",
    "数学学院",
    "物理科学与技术学院（核科学与工程技术学院)",
    "化学学院",
    "生命科学学院",
    "灾后重建与管理学院",
    "公共管理学院",
    "商学院",
    "华西基础医学与法医学院",
    "华西临床医学院",
    "华西口腔医学院",
    "华西公共卫生学院",
    "华西药学院",
    "华西动物中心",
    "联合班",
    "联合吴玉章学院班",
    "研究生院",
    "体育学院",
    "其它"

];
var year = [
    "",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015"
];

module.exports = code;
module.exports.college = college;
module.exports.year = year;