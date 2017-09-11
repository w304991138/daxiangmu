/* 
* @Author: Marte
* @Date:   2017-09-09 17:11:20
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 19:44:47
*/

require(['config'],function(){
    require(['base','jqurey'],function(){
        console.log(666)

        $('.top').on('click',function(){
          $.ajax({
            url:'../php/index.php',
            success:function(data){
              var res = JSON.parse(data);
              console.log(res);
              // var arr=[];
              // $(res).each(function(idx,item){
                
              //   arr.push(item.price*1);
              // })
              // for(var i=0;i<arr.length-1;i++){
              //   for(var j=i+1;j<arr.length;j++){

              //     // 比较大小
              //     if(arr[i] < arr[j]){
              //       // 互换位置
              //       var temp = arr[j];
              //       arr[j] = arr[i];
              //       arr[i] = temp;
              //     }
              //   }
              // }
              
            }
          })
        })


        // 懒加载
        var page_no = 1;
        var page_qty = 8;
        var last  =  page_no;
        $.ajax({
                        url:'../php/fruit.php',
                        data:{lan:'yes'},
                        success:function(data){
                            var res =JSON.parse(data).data;
                            page_no++
                            console.log(page_no);
                            $(res).each(function(idx,item){
                                $('.list_left').append(`
                                    <li>
                                        <div class="a_car"></div>
                                        <span class="good_id">${item.id}</span>
                                        <div class="f_img">
                                        <a href="../html/xiangqing.html?id=${item.id}"><img src="../${item.imgurl}"  /></a> 
                                        </div>
                                        <div class="f_title_1">${item.title_1}
                                            <span class="f_price">￥${item.price}</span>
                                        }
                                        </div>
                                        <div class="f_guige"><span>${item.guige}</span></div>

                                    </li>
                                    `)
                            })
                            
                        }
                    })
        // 懒加载
        window.onscroll = function(){
                var scrollTop = window.scrollY;
                // 滚动的距离
                // 快滚动到底部滚动到底部
                if(scrollTop >= document.documentElement.scrollHeight-window.innerHeight-450 && last !== page_no){
                  // console.log(page_no)
                  last = page_no;
                  console.log(123)
                    $.ajax({
                        url:'../php/fruit.php',
                        data:{lan:'yes',page_no:page_no},
                        success:function(data){
                          page_no++
                          
                          console.log(page_no);
                          var res =JSON.parse(data).data;
                          console.log(res);
                          var n = Math.ceil(JSON.parse(data).total/page_qty);
                          $(res).each(function(idx,item){
                                $('.list_left').append(`
                                    <li>
                                        <div class="a_car"></div>
                                        <span class="good_id">${item.id}</span>
                                        <div class="f_img">
                                        <a href="../html/xiangqing.html?id=${item.id}"> <img src="../${item.imgurl}"  /></a>
                                        </div>
                                        <div class="f_title_1">${item.title_1}
                                            <span class="f_price">￥${item.price}</span>
                                        }
                                        </div>
                                        <div class="f_guige"><span>${item.guige}</span></div>

                                    </li>
                                    `)
                            })

                        }
                    })
                      
                }
            }
        $.ajax({
            url:'../php/pinglei.php',
            success:function(data){
                var res = JSON.parse(data);
                console.log(res);
                $(res).each(function(idx,item){
                    $($('.fruit .right')[0]).append(`
                        <a><span>${item.name}</span></a>
                        `)
                })
            }
        })

        $.ajax({
            url:'../php/index.php',
            success:function(data){
                var res = JSON.parse(data);
                console.log(res);
                // $(res).each(function(idx,item){
                //     $('.list_left').append(`
                //         <li>
                //             <div class="a_car"></div>
                //             <span class="good_id">${item.id}</span>
                //             <div class="f_img">
                //                 <img src="../${item.imgurl}"  />
                //             </div>
                //             <div class="f_title_1">${item.title_1}
                //                 <span class="f_price">￥${item.price}</span>
                //             }
                //             </div>
                //             <div class="f_guige"><span>${item.guige}</span></div>

                //         </li>
                //         `)
                // })
            }
        })


        // 点击商品加入购物车
      $('.list_left').on('click','.a_car',function(){
        console.log(666)
         // 点击加入购物车，同步首页购物车商品数量
         var id=  $(this).siblings('.good_id').html();
         
        // 点击获取商品数据，然后加入到购物车的数据库;
        alert('成功加入购物车')
        var good_id= $(this).siblings('.good_id').html();
        console.log(good_id)

        $.ajax({
          // 通过id获取到商品数据,然后写入到购物车的数据库
            url:'../php/index.php',
            
            data:'id='+good_id,
            success:function(data){
              var res = JSON.parse(data)
              console.log(res);
              var id =res[0].id;
              var title_1 =res[0].title_1;
              var title_2 =res[0].title_2;
              var price = res[0].price;
              var guige  = res[0].guige;
              var imgurl = res[0].imgurl;
             

              
              var total = $('.total').html()*1;
              total +=price*1;
              $('.total').html(total.toFixed(2));
              console.log(total);

              $.ajax({
                // 写入到购物车的数据库
                  url:'../php/car.php',
                  data:{id:id,title_1:title_1,title_2:title_2,price:price,guige:guige,imgurl:imgurl},
                  success:function(data){
                    var res = JSON.parse(data)
                      console.log(res);
                      // 如果res返回的是[]，说明商品第一次加入，如果返回数组说明是多次加入
                      // 声明一个ky，后面便于判断只有除第一次加入购物车，才给数量加一
                      // 如果ky = true 那么就可以给数量加一
                    var ky;
                      if(res[0]){
                        ky = true
                      }
      
                    // 等加入购物车的商品写入购物车后再请求购物车数据，判断购物车商品数量
                    // 
                    // 获取商品总个数
                    
                    
                    $.ajax({
                        url:'../php/car.php',
                        success:function(data){
                          var res = JSON.parse(data);
                          var num = res.length*1;
                          console.log(res);
                          $('.car_num').html(num);
                          $('.car_pay .pay_l').find('span').html(num);
                        // 获取商品总个数
                          var z_qty=0;
                          var total =0;
                          $('.show_list').empty();
                          $.each(res,function(idx,item){
                            z_qty +=item.qty*1;
                            total +=item.price*item.qty;

                            $('.show_list').append(
                                `<li>
                                    <a href="">
                                      <img src="${item.imgurl}" class="good_img" />
                                      <div class="good_in">
                                        <p class="_title">${item.title_1}</p>
                                        <p>${item.title_2}</p>
                                      </div>
                                    </a>
                                    <div class="qty">
                                      <span class="jian">-</span>
                                      <input type="text" class="qty_num" value="${item.qty}"/>
                                      <span class="jia">+</span>
                                    </div>
                                    <span class="car_del">删除</span>
                                    <span class="good_id">${item.id}</span>
                                  </li>`
                                )

                          })
                          $('.car_show2 .good_id').each(function(idx,item){
                              if($(item).html()===id){
                                var num = $(item).parent().find('.qty_num').val();
                                num++;
                                $(item).parent().find('.qty_num').val(num);
                              }
                           })
                          console.log(total);
                          // 总商品数
                          // 加入商品后，更新商品列表
                          // 把改变的商品数量写入数据库
                          $.ajax({
                            url:'../php/car.php',
                            data:{id:id},
                            success:function(data){
                              var res = JSON.parse(data);
                              var qty = res[0].qty;
                              
                              console.log(res);
                              if(ky){
                                // 通过判断，数据库返回的数据，来判定数量的加减
                                qty++
                                $.ajax({
                                  url:'../php/car.php',
                                  data:{id:id,qty:qty},
                                  success:function(data){
                                    var res = JSON.parse(data);
                                    var qty = res[0].qty;
                                    console.log(qty);
                                  }
                                })
                              }
                              
                            }
                          })

                        }
                    })
                  }
              })         
            }
        })

        
      })

    })
})