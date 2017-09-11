/* 
* @Author: Marte
* @Date:   2017-09-09 09:49:49
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-09 20:07:02
*/

require(['config'],function(){
    require(['base','jqurey'],function(){
        
        // 读取数据库中的购物车表，生成购物车html结构
        $.ajax({
            url:'../php/car.php',
            success:function(data){
                
                var res = JSON.parse(data);
                var z_total=0;
                // console.log(res);
                // 获取到数据，写入html
                $(res).each(function(idx,item){
                    // console.log(item);
                    
                    var total = item.price*item.qty*1;
                    z_total+= total;
                    $('.car_list').append(`
                        <li class="car_good">
                            <img src="../${item.imgurl}"  />
                            <div class="car_title_1">
                            <a href="">${item.title_1}</a></div>
                            <div class="car_guige">${item.guige}</div>
                            <div class="car_price"><span>￥${item.price}</span></div>
                            <div class="qty">
                                <span class="jian">-</span>
                                <input type="text" class="qty_num" value="${item.qty}"/>
                                <span class="jia">+</span>
                            </div>
                            <span class="good_id">${item.id}</span>
                            <div class="car_price2"><span>￥${total}</span></div>
                            <div class="car_del2">删除</div>
                        </li>
                        `)
                })
                var num = $('.car_list li').length
                $('.car_jiesuan').find('.car_qty').html(num+'件');
                $('.car_jiesuan .car_total').html('￥'+z_total);
            }
        })

        // 点击加减购物车商品数量
        // 点击+号添加
        // 
        
        
        $('.car_list').on('click','.jia',function(){
            console.log(666);
            var qty=$(this).siblings('.qty_num').val()*1;
            var id =$(this).parent().siblings('.good_id').html();
            var total =$(this).parent().siblings('.car_price2').find('span');
            // console.log(id);
            qty++;
            $(this).siblings('.qty_num').val(qty);
            $.ajax({
              url:'../php/car.php',
              data:{id:id,qty:qty},
              success:function(data){
                var res = JSON.parse(data);
                console.log(res)
                var _total = res[0].price*res[0].qty;
                console.log(total);
                _total+=res[0].price*1;
                total.html('￥'+_total.toFixed(1));
                var z_total = $('.car_jiesuan .car_total').html().slice(1)*1;
                // console.log(z_total);
                z_total+=res[0].price*1;
                $('.car_jiesuan .car_total').html('￥'+z_total.toFixed(2));
              }
            })
        
        })

        // 点击减，减去购物车数量，和价格
        $('.car_list').on('click','.jian',function(){
            console.log(666);
            var qty=$(this).siblings('.qty_num').val()*1;
            var id =$(this).parent().siblings('.good_id').html();
            var total =$(this).parent().siblings('.car_price2').find('span');
            // console.log(id);
            qty--;
            if(qty<1){qty=1}
            $(this).siblings('.qty_num').val(qty);
            $.ajax({
              url:'../php/car.php',
              data:{id:id,qty:qty},
              success:function(data){
                var res = JSON.parse(data);
                console.log(res)
                var _total = res[0].price*res[0].qty;

                console.log(total);
                _total-=res[0].price*1;
                var z_total = $('.car_jiesuan .car_total').html().slice(1)*1;
                if(qty===1){
                    total.html('￥'+res[0].price*1);
                    $.ajax({
                        url:'../php/car.php',
                        success:function(data){
                            var res = JSON.parse(data);
                            var total=0;
                            $(res).each(function(idx,item){
                                total+=item.price*item.qty;
                            })
                            $('.car_jiesuan .car_total').html('￥'+total.toFixed(2));
                        }
                    })
                    
                }else{ total.html('￥'+_total.toFixed(1)); 
                z_total-=res[0].price*1;
                $('.car_jiesuan .car_total').html('￥'+z_total.toFixed(2));
                }
                
                 
              var num = $('.car_list li').length
               $('.car_jiesuan').find('.car_qty').html(num+'件');


              }
            })
        
        })

        // 点击删除，删除商品
        $('.car_list').on('click','.car_del2',function(){
        $(this).parent().remove();
        var id =$(this).siblings('.good_id').html();
        console.log(id);
        $.ajax({
            url:'../php/car.php',
            data:{del:'yes',id:id},
            
            
            success:function(data){

                var num = $('.car_list li').length
               $('.car_jiesuan').find('.car_qty').html(num+'件');

              var res = JSON.parse(data);
              console.log(res);
              $(res).each(function(idx,item){
                if(item.id === id){
                  console.log(item.price);
                  var total =$('.total').html()*1;
                  total-=item.price*item.qty;
                  $('.total').html(total.toFixed(2));
                }
              })
            }
        })
        
      })
        


    })
})        