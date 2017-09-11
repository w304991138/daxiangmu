/* 
* @Author: Marte
* @Date:   2017-09-05 09:39:44
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 21:43:37
*/

require(['config'],function(){
    require(['base','common','jqurey'],function(){
        // 随机验证码

        var random = vCode();
        console.log(random)
        $('.yzm').html(random);

    // 点击刷新按钮获取验证码
        $('.shuaxin').on('click',function(){
            console.log(666)
            $('.yzm').html(vCode());
        })
    // 验证验证码
    
    $('._yzm').on('blur',function(){
        var _yzm = $('._yzm').val();
        var yzm = $('.yzm').html();
        if(_yzm !== yzm){
            $('._yzm').siblings('span').addClass('no');
            $('._yzm').addClass('not');
            return false;
        }else{
            $('._yzm').siblings('span').addClass('yes');
            $('._yzm').addClass('yep');
         }
    }).on('focus',function(){
        $('._yzm').removeClass('not').removeClass('yep');
        $('._yzm').siblings('span').removeClass('no').removeClass('yes');
    })

    // 验证手机号
    $('.phone_num').on('blur',function(){
        var username = $('.phone_num').val();
        var reg =/^1[34578]\d{9}$/;
        if(!reg.test(username)){
            // $('#zhezhao-open').show();
            // $('#zhezhao-open .tips').html('请输入11位数字的手机号！');
            $('.phone_num').next().addClass('no');
            $('.phone_num').addClass('not');
            return false;
        }else{
            $('.phone_num').next().addClass('yes');
            $('.phone_num').addClass('yep');
         }

    }).on('focus',function(){
        $('.phone_num').removeClass('not').removeClass('yep');
        $('.phone_num').next().removeClass('no').removeClass('yes');
    })

    // 验证密码
    var password_1;
    $('.password_1').on('blur',function(){
        password_1 = $(this).val();
        var reg = /^\S{6,20}$/;
        if(!reg.test(password_1)){
            $('.password_1').next().addClass('no');
            $('.password_1').addClass('not');
            return false;
        }else{
            $('.password_1').next().addClass('yes');
            $('.password_1').addClass('yep');
        }
    }).on('focus',function(){
        $('.password_1').removeClass('not').removeClass('yep');
        $('.password_1').next().removeClass('no').removeClass('yes');
    })
    
    // 验证两次密码是否相同
    $('.password_2').on('blur',function(){
       
        var password_2 =$(this).val();
        if(password_2 !==password_1){
            $('.password_2').next().addClass('no');
            $('.password_2').addClass('not');
            return false;
        }else{
            $('.password_2').next().addClass('yes');
            $('.password_2').addClass('yep');
        }
    }).on('focus',function(){
        $('.password_2').removeClass('not').removeClass('yep');
        $('.password_2').next().removeClass('no').removeClass('yes');
    })

    // 点击获取短信验证码
    $('.send').on('click',function(){
        $('.dis').removeAttr('disabled');
        var time =60
        $('.dis').css({'cursor':'default'});
    var timer =   setInterval(function(){      
            time--;
            $('.send').html(time+'s');
            if(time<=0){clearInterval(timer)
                $('.send').html('重新获取验证码');
                $('.dis').prop('disabled',true);
            };
        }, 1000)
    })
    
    // 点击注册
    $('.zhuche').on('click',function(){
        var res=0
        $('.zc_r input').slice(0, 4).each(function(){
            if($(this).hasClass('yep')){
                res++
            }
        })
        // 满足所有条件开始查询数据库
        if(res===4){
            var username = $('.phone_num').val();
            var password =$('.password_2').val();
            console.log(username,password);
            $.ajax({

                url:'../php/register.php',
                data:{username:username,password:password},
                success:function(data){
                    var res= data
                    console.log(res);
                    if(res==='no'){
                        $('#zhezhao-open').show();
                        $('#zhezhao-open .tips').html('这个账号已经存在！')
                    }
                    else{
                        location.href='../index.html'
                    }
                    
                }
            })
        }
        
     
    })

       // var reg = /^[a-z][\da-z\-]{5,19}$/i;
       // if(!reg.test(username)){
       //      alert('用户名不合法');
       //      // e.preventDefault()
       //      return false;
       // }

    })
})