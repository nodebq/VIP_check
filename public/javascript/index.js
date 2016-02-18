
function turnSuccess(){
    var _this = $("#card");
    _this.flip({
        direction:'lr',
        color:"RGB(128,128,128,0.001)",
        content:' ',
        onEnd: function(text){
            _this.css({
                "background-image":"url(img/success.png)",
                color: 'white'
            }).unbind('click');
        }
    });
}
function turnFailed(text){
    var _this = $("#card");
    _this.flip({
        direction:'lr',
        color:"RGB(128,128,128,0.001)",
        content:'<div id="text">'+text+'</div><img onclick="window.location.reload();" class="refresh" src="img/refresh.png" alt="重新验证">',
        onEnd: function(){
            _this.css({
                "background-image":"url(img/failed.png)",
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
                    var url = "http://127.0.0.1:19410/check?name=" + name.value + "&gender=" + gender.value + "&phone=" + phone.value + "&vip_num=" + vip_num.value;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send(null);
                    var jxhr = JSON.parse(xhr.responseText);
                    if(jxhr.code==200||jxhr.code==2008){
                        turnSuccess(jxhr.message);
                    }else {
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


