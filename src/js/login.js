/* 
* @Author: Marte
* @Date:   2017-09-06 10:12:52
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-06 16:07:57
*/

require(['config'],function(){
    require(['base','common','jqurey'],function(){
        var cookies=document.cookie;
        console.log(cookies)
        $('.zhuche').on('click',function(){

            var username = $('.phone_num').val();
            var password = $('.password_1').val();
            console.log(username,password);
            $.ajax({

                url:'../php/login.php',
                data:{username:username,
                    password:password},
                success:function(data){
                    if(data==='1'){
                        if($('#checkbox').prop('checked')){
                            var now =new Date();
                            now.setDate(now.getDate()+7);
                            document.cookie ='username='+username+';path=/'+';expires='+now.toString();
                            document.cookie ='password='+password+';path=/'+';expires='+now.toString();
                            location.href='../index.html'
                        }
                        
                    }else{
                        $('#zhezhao-open').show();
                        $('#zhezhao-open .tips').html('用户名或密码错误！')
                    }
                }
                
            })

        })



    })
})