function validate(){
    var name = document.getElementById("name");
    if(name.value){
        var gender = document.getElementById("gender");
        if(gender.value){
            var phone = document.getElementById("phone");
            if(phone.value){
                var vip_num = document.getElementById("vip_num");
                if(vip_num.value){
                    //验证成功
                    var url = "http://127.0.0.1:19410/check?name="+name.value+"&gender="+gender.value+"&phone="+phone.value+"&vip_num="+vip_num.value;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET",url,false);
                    xhr.send(null);
                    alert(xhr.responseText);

                }else{
                    alert("不输入会员号是不行的");
                    vip_num.focus();
                    return false
                }
            }else{
                alert("童鞋你没有手机吗?");
                phone.focus();
                return false
            }
        }else{
            alert("童鞋你没有性别吗?");
            gender.focus();
            return false
        }
    }else {
        alert("童鞋你没有名字吗?");
        name.focus();
        return false
    }
}

$(document).ready(function() {



    /*	2nd example	*/

    $("#menu2 li a").wrapInner( '<span class="out"></span>' );

    $("#menu2 li a").each(function() {
        $( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
    });

    $("#menu2 li a").hover(function() {
        $(".out",	this).stop().animate({'top':	'45px'},	200); // move down - hide
        $(".over",	this).stop().animate({'top':	'0px'},		200); // move down - show

    }, function() {
        $(".out",	this).stop().animate({'top':	'0px'},		200); // move up - show
        $(".over",	this).stop().animate({'top':	'-45px'},	200); // move up - hide
    });

});