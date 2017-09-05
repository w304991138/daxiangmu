/* 
* @Author: Marte
* @Date:   2017-09-02 09:53:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-04 16:01:33
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
       
       // 悬浮框点击返回顶部
       
       $('.back').on('click',function(){
        var scrollTop = $('body').scrollTop();
          // $('html,body').stop().animate({'scrollTop':0}, 'slow');
          scrollTop=0;
       })



       $('.tou').load('./index.html .top',function(){
          
       })
    })
})