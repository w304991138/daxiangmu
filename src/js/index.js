/* 
* @Author: Marte
* @Date:   2017-09-02 09:54:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 21:19:56
*/

require(['config'],function(){
    require(['base','jqurey'],function(){
        // 轮播图：
       var len=$('.showTime img').length;
       var idx=0;
       var timer;
       var width=$('.showTime img').eq(1).width();

       clearInterval(timer);
   
       $('.page li').eq(0).addClass('ative');
       timer = setInterval(autoShow, 3000);
       
       // 点击跳到对应图片
       $('.picShow').on('click','.page li',function(){
            idx = $(this).index();
            $('.page li').removeClass('ative').eq(idx).addClass('ative');
            show();
            console.log(this);
       }).on('mouseenter',function(){clearInterval(timer)}).on('mouseleave',function(){
            timer = setInterval(autoShow, 3000)
       })

       // 鼠标悬停
          
        // 基本功能
        function show(){
            if(idx>=len){ idx=0;}
            $('.showTime').stop().animate({left:-idx*width}, 600)
            $('.page li').removeClass('ative').eq(idx).addClass('ative');
       }
       function autoShow(){
            idx++;
            show(); 
       }


        // 图片放大
        $img = $('.goods_list_1 ul');
        $img.on('mouseenter','img',function(){
            
            $(this).stop().animate({width:'270px',height:'270px',left:'-10px',top:'-10px'}, 200)
        }).on('mouseleave','img',function(){
            $(this).stop().animate({width:'248px',height:'248px',left:'0',top:'0'}, 200)
        })
        

    })
})