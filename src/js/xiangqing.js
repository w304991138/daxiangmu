/* 
* @Author: Marte
* @Date:   2017-09-11 11:51:11
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 18:54:19
*/

require(['config'],function(){
    require(['base','jqurey'],function(){
        $('.xiangqing .left_1').on('mouseover','li',function(){
           var src  =  $(this).find('img').attr('src');
           $('.xiangqing .left_2').find('img').attr("src",src);


           
           

        })

        // 通过过去id，给数据库发送id，获取商品数据，然后写入
        var id = location.search.substring(1).split('=')[1];
           $.ajax({
            url:'../php/index.php',
            data:{id:id},
            success:function(data){
                var res  = JSON.parse(data);
                var imgurl ='../'+res[0].imgurl
                console.log(imgurl);
                $('.xiangqing .left_2').find('img').attr("src",imgurl);
                $('.img_1').find('img').attr('src',imgurl);
                $('.title_1').html(res[0].title_1);
                $('.lei').html(res[0].lei);
                $('.xiangqing .price').find('span').html('￥'+res[0].price);
                $('.xiangqing .guige').find('span').html('￥'+res[0].guige);

            }
           })

           $('.xiangqing .car_in').on('click',function(){
            console.log(666)
           var copyImg=$('.xiangqing .left_2').clone().addClass('fei');
           $('.xiangqing .left').append(copyImg);
           copyImg.animate({top: 70, left: 1230,width:0,height:0}, 600,function(){
            copyImg.remove();
           });


           })


    })
})