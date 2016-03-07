function turnSuccess() {
    var _this = $("#card");
    _this.flip({
        direction: 'lr',
        color: "RGB(128,128,128,0.001)",
        content: ' ',
        onEnd: function (text) {
            _this.css({
                "background-image": "url(img/success.png)",
                color: 'white'
            }).unbind('click');
        }
    });
}
function turnFailed(text) {
    var _this = $("#card");
    _this.flip({
        direction: 'lr',
        color: "RGB(128,128,128,0.001)",
        content: '<div id="text">' + text + '</div><img onclick="window.location.reload();" class="refresh" src="img/refresh.png" alt="重新验证">',
        onEnd: function () {
            _this.css({
                "background-image": "url(img/failed.png)",
                color: 'white'
            }).unbind('click');
        }
    });
}


function validate() {
    var name = document.getElementById("name");
    if (name.value) {
        var gender = document.getElementById("gender");
        if (gender.value) {
            if (gender.value == "男") {
                gender.value = 1;
            } else if (gender.value == "女") {
                gender.value = 0;
            }
            var phone = document.getElementById("phone");
            if (phone.value) {
                var vip_num = document.getElementById("vip_num");
                if (vip_num.value) {
                    //验证成功
                    var Name = encodeURIComponent(name.value);
                    var url = "http://203.195.164.179:19410/check?name=" + Name + "&gender=" + gender.value + "&phone=" + phone.value + "&vip_num=" + vip_num.value;
                    console.log(url);
                    var xhrRes = createCORSRequest('GET', url);
                    console.log(xhrRes);
                    var jxhr = JSON.parse(xhrRes);
                    if (jxhr.code == 200 || jxhr.code == 2008) {
                        turnSuccess(jxhr.message);
                    } else {
                        turnFailed(jxhr.message);
                    }
                    //turn();

                } else {
                    alert("不输入会员号是不行的");
                    vip_num.focus();
                    return false
                }
            } else {
                alert("童鞋你没有手机吗?");
                phone.focus();
                return false
            }
        } else {
            alert("童鞋你没有性别吗?");
            gender.focus();
            return false
        }
    } else {
        alert("童鞋你没有名字吗?");
        name.focus();
        return false
    }
}

$(document).ready(function () {

    /*	2nd example	*/
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function () {
        $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
    });
    $("#menu2 li a").hover(function () {
        $(".out", this).stop().animate({'top': '45px'}, 200); // move down - hide
        $(".over", this).stop().animate({'top': '0px'}, 200); // move down - show
    }, function () {
        $(".out", this).stop().animate({'top': '0px'}, 200); // move up - show
        $(".over", this).stop().animate({'top': '-45px'}, 200); // move up - hide
    });

});


function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    console.log(url);
    if ("withCredentials" in xhr) {
// 此时即支持CORS的情况
// 检查XMLHttpRequest对象是否有“withCredentials”属性
// “withCredentials”仅存在于XMLHTTPRequest level 2对象里
        console.log("success");
    } else {
// 否则检查是否支持XDomainRequest
// XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式
        xhr = new XDomainRequest();
        console.log("failed");
    }
    xhr.open(method, url, false);
    xhr.send();
    if(xhr.responseText){
        return xhr.responseText;
    }else {
        return {"code":1005,"message":"不支持xhr,请更换更新版本的浏览器"}
    }
}


window.onload = function() {
    document.getElementById("md").click();
};