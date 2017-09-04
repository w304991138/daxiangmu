/* 
* @Author: Marte
* @Date:   2017-09-02 09:53:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-02 17:59:12
*/
require(['config'],function(){

    require(['jqurey'],function(){
        // 顶部弹窗
       $('.top_r .top_gonggao').hover(function() {
           $( '.gonggao').show();

       }, function() {
            $('.gonggao').hide();
       });

       $('.top_r .guoyuan').hover(function(){
            $('.phone').show();
       },function(){
            $('.phone').hide();
       })
       
       // 轮播图：
       var len=$('.showTime img').length;
       var idx=0;
       var timer;
       var width=$('.showTime img').eq(1).width();

       clearInterval(timer);

       function autoShow(){
            idx++;
            show(); 
       }
       $('.page li').eq(0).addClass('ative');
       timer = setInterval(autoShow, 2000);
       
       // 点击跳到对应图片
       $('.picShow').on('click','.page li',function(){
            idx = $(this).index();
            $('.page li').removeClass('ative').eq(idx).addClass('ative');
            show();
            console.log(this);
       }).on('mouseenter',function(){clearInterval(timer)}).on('mouseleave',function(){
            timer = setInterval(autoShow, 2000)
       })

       // 鼠标悬停
       
     
        // 基本功能
        function show(){
            if(idx>=len){ idx=0;}
            $('.showTime').animate({left:-idx*width}, 600)
            $('.page li').removeClass('ative').eq(idx).addClass('ative');
       }


    })
})