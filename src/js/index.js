/* 
* @Author: Marte
* @Date:   2017-09-02 09:54:14
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-11 18:59:44
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
       })

       // 鼠标悬停
      $('.picShow').on('mouseenter','img',function(){clearInterval(timer)}).on('mouseleave','img',function(){
            timer = setInterval(autoShow, 3000)
       })
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
        $img = $('.goods .good_list');
        $img.on('mouseenter','img',function(){
            
            $(this).stop().animate({width:'270px',height:'270px',left:'-10px',top:'-10px'}, 200)
        }).on('mouseleave','img',function(){
            $(this).stop().animate({width:'248px',height:'248px',left:'0',top:'0'}, 200)
        });
        
        // 账号登录状态
       var cookies=document.cookie.split('; ');
        console.log(cookies)
        cookies.forEach(function(item){
          var arr = item.split('=');
          
          console.log(arr[0],arr[1]);
          
          if( arr[0] === 'username' ){
            $('.denglu').html(arr[1]);
            $('.zhuche').html('退出').parent('li').css({'padding':0});
            var zhuche=document.querySelector('.zhuche');
            zhuche.href='';
            // $('.zhuche').remove('href');
            // $($('.zhuche')).href='index.html'
            $('.ninhao').show();
            console.log($('.zhuche').html('退出').parent('li'))
            $('.douhao').remove();

            $('.zhuche').on('click',function(){
              
              var now = new Date()
              now.setDate(now.getDate()-100);
              // 删除cookie
              document.cookie = 'username=xx'+';path=/'+';expires=' + now.toString();
              document.cookie = 'password=xx'+';path=/'+';expires=' + now.toString();
              
              // 手动刷新页面
              window.location.reload();
              
            })

          }
        });

        // 从数据库获取数据
        $.ajax({
            url:'php/index.php',
            // data:'lei=liping',
            success:function(data){
              var res =JSON.parse(data)
               console.log(res);
               var arr_liping=[];
               var arr_liangfan=[];
               var arr_xianguo=[];
               var arr_shengxian=[];
               $(res).each(function(idx,item){
                  if(item.lei === 'shengxian'){
                    arr_shengxian.push(item)
                  }else if(item.lei === 'xianguo'){
                    arr_xianguo.push(item)
                  }else if(item.lei === 'liangfan'){
                    arr_liangfan.push(item)
                  }else if(item.lei ==='liping'){
                    arr_liping.push(item)
                  }
                  
                });
              
               $(arr_liping.slice(0, 15)).each(function(idx,item){
                  $('.good_list.l1').append(
                    `<li>
                          <div><a href="html/xiangqing.html?id=${item.id}"><img src='${item.imgurl}'/></a></div>
                          <p class="s_name">${item.title_1}</p>
                          <p class="s_price">${item.title_2}</p>
                          <span class="a_car"></span>
                          <span class="good_id">${item.id}</span>
                    </li>`)
               })

               $(arr_liangfan.slice(0, 10)).each(function(idx,item){
                  $('.good_list.l2').append(
                    `<li>
                          <div><a href="html/xiangqing.html?id=${item.id}"><img src='${item.imgurl} '/></a></div>
                          <p class="s_name">${item.title_1}</p>
                          <p class="s_price">${item.title_2}</p>
                          <span class="a_car"></span>
                          <span class="good_id">${item.id}</span>
                    </li>`)
               })

               $(arr_xianguo.slice(0, 10)).each(function(idx,item){
                  $('.good_list.l3').append(
                    `<li>
                          <div><a href="html/xiangqing.html?id=${item.id}"><img src='${item.imgurl} '/></a></div>
                          <p class="s_name">${item.title_1}</p>
                          <p class="s_price">${item.title_2}</p>
                          <span class="a_car"></span>
                          <span class="good_id">${item.id}</span>
                    </li>`)
               })

               $(arr_shengxian.slice(0, 15)).each(function(idx,item){
                  $('.good_list.l4').append(
                    `<li>
                          <div><a href="html/xiangqing.html?id=${item.id}"><img src='${item.imgurl} '/></a></div>
                          <p class="s_name">${item.title_1}</p>
                          <p class="s_price">${item.title_2}</p>
                          <span class="a_car"></span>
                          <span class="good_id">${item.id}</span>
                    </li>`)
               })
              
             
            }

        })
        
        // 首页购物车
        // 点击动画
        $('.nav_car').on('click',function(){
          $.ajax({
                // 写入到购物车的数据库
                  url:'php/car.php',
                  // data:{title_1:title_1,title_2:title_2,price:price,guige:guige,imgurl:imgurl},
                  success:function(data){
                    var res =JSON.parse(data);
                    console.log(res);
                      if(res.length===0){
                        if($('.car_show').css('display')==='block'){
                          $('.car_show').slideUp('fast');
                        }else{$('.car_show').slideDown('fast');}
                      }else{
                        if($('.car_show2').css('display')==='block'){
                          $('.car_show2').slideUp('fast');
                        }else{$('.car_show2').slideDown('fast');}
                      }
                  }
              })      
          
          
        })

      // 购物车显示商品个数
      
      // $('car_num').html('')

      // 首页购物车，点击加减
      // 删除：
      $('.car_show2').on('click','.car_del',function(){
        $(this).parent().remove();
        var id =$(this).parent().find('.good_id').html();
        console.log(id);
        $.ajax({
            url:'php/car.php',
            data:{del:'yes',id:id},
            
            
            success:function(data){
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
              // var total =$('.total').html()*1;
              // total -= 
            }
        })
        
      })

      // 首页购物车的加减
      //加：
      $('.car_show2').on('click','.jia',function(){
        var qty=$(this).siblings('.qty_num').val()*1;
        var id =$(this).parent().siblings('.good_id').html();
        qty++;
        $(this).siblings('.qty_num').val(qty);
        $.ajax({
          url:'php/car.php',
          data:{id:id,qty:qty},
          success:function(data){
            var res = JSON.parse(data);
            console.log(res)
            var total = $('.total').html()*1;
            total+=res[0].price*1;
            $('.total').html(total.toFixed(2));
          }
        })
        
      })
      
      // 减：
      $('.car_show2').on('click','.jian',function(){
        var qty=$(this).siblings('.qty_num').val()*1;
        var id =$(this).parent().siblings('.good_id').html();
        var n =qty;
        qty--;
        if(qty<1){qty=1}
        $(this).siblings('.qty_num').val(qty)
        $.ajax({
          url:'php/car.php',
          data:{id:id,qty:qty},
          success:function(data){
            var res = JSON.parse(data);
            console.log(res);
            
            if(n>1){
              var total = $('.total').html()*1;
               total-=res[0].price*1;
              $('.total').html(total.toFixed(2));
            }
           
          }
        })

      })

        
      // 点击商品加入购物车
      $('.goods').on('click','.a_car',function(){

         // 点击加入购物车，同步首页购物车商品数量
         var id=  $(this).siblings('.good_id').html();
         
        // 加入购物车，飞入购物车效果
        
        // $(this).parent().clone().addClass('ative').animate({
        //   'width': '1000px'
        //   },600);
        //   
        $('#zhezhao-open').show();
        $('#zhezhao-open .tips').html('成功加入购物车')



        // 点击获取商品数据，然后加入到购物车的数据库;
        // alert('成功加入购物车')
        var good_id= $(this).siblings('.good_id').html();
        console.log(good_id)

        $.ajax({
          // 通过id获取到商品数据,然后写入到购物车的数据库
            url:'php/index.php',
            
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
              // var qty= res[0].qty;
              

              // 点击加入购物车，把商品结构加入到首页购物车里，并上传到购物车数据库
              
              // $('.show_list').append(
              //     `<li>
              //         <a href="">
              //           <img src="${imgurl}" class="good_img" />
              //           <div class="good_in">
              //             <p class="_title">${title_1}</p>
              //             <p>${title_2}</p>
              //           </div>
              //         </a>
              //         <div class="qty">
              //           <span class="jian">-</span>
              //           <input type="text" class="qty_num" value="1"/>
              //           <span class="jia">+</span>
              //         </div>
              //         <span class="car_del">删除</span>
              //         <span class="good_id">${id}</span>
              //       </li>`
              //     )
              var total = $('.total').html()*1;
              total +=price*1;
              $('.total').html(total.toFixed(2));
              console.log(total);

              $.ajax({
                // 写入到购物车的数据库
                  url:'php/car.php',
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
                        url:'php/car.php',
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
                          // $('.car_show2 .good_id').each(function(idx,item){
                          //     if($(item).html()===id){
                          //       var num = $(item).parent().find('.qty_num').val();
                          //       num++;
                          //       $(item).parent().find('.qty_num').val(num);
                          //     }
                          //  })
                          console.log(total);
                          // 总商品数
                          // 加入商品后，更新商品列表
                          



                          // 把改变的商品数量写入数据库
                          // 
                          
                          $.ajax({
                            url:'php/car.php',
                            data:{id:id},
                            success:function(data){
                              var res = JSON.parse(data);
                              var qty = res[0].qty;
                              
                              console.log(res);
                              if(ky){
                                // 通过判断，数据库返回的数据，来判定数量的加减
                                qty++
                                $.ajax({
                                  url:'php/car.php',
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
                                
                    // var res = JSON.parse(data);

                      
                    //  var   qty=res[0].qty*1+1;
                    //   $.ajax({
                    //     url:'php/car.php',
                    //     data:{id:id,qty:qty},
                    //     success:function(data){
                          
                    //     }
                    //   })
                 
                      
                    // console.log(qty);

                  }
              })         
            }
        })

        
      })
      
          

    
            // 读取购物车数据库
        $.ajax({
          url:'php/car.php',
          
          success:function(data){
            var res =JSON.parse(data);
            var total =0;
            console.log(res);
          // 生成购物车里商品数量
          $('.car_num').html(res.length);
          var num = 0;
            // 生成购物车数据
            $.each(res,function(idx,item){
              num++
                console.log(item);
                total+=item.price*item.qty*1;
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
            // 写入html
            $('.total').html(total.toFixed(2));
            $('.car_pay .pay_l').find('span').html(num);

            console.log(total)
          }
        })
        


    })
})