<?php
/**
 * @Author: Marte
 * @Date:   2017-09-06 17:10:23
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-11 19:50:16
 */
// 配置参数
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'xu_xiangmu';

$conn = new mysqli($servername, $username, $password, $dbname);
    // 检测连接
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }
    
// 获取前端传来的数据
// $username = isset($_GET['username']) ? $_GET['username'] : '';

$lan = isset($_GET['lan']) ? $_GET['lan']:'';
$page_no = isset($_GET['page_no']) ? $_GET['page_no'] : 1;
    // isset检测变量是否设置
$qty = isset($_GET['qty']) ? $_GET['qty'] : 8;

$id = isset($_GET['id']) ? $_GET['id']:'';
// echo $username;
$sql = 'select * from goods';

if($id !==''){ $sql .=" where id='$id'";}
// $sql .=" where name='$username'";

// 防止中文乱码
$conn->set_charset('utf8');

$result = $conn->query($sql);

$row = $result->fetch_all(MYSQLI_ASSOC);



// $n= count($row);
// // echo $n;
// if($n==1){
//     echo "no";
// }else{
//     $sql ="INSERT INTO `user` (name, password)
//     VALUES ('$username','$password')";
//         if ($conn->query($sql) === TRUE) {
//                 echo "yes";
//         } 
//     }
// if($lan !==''){
//     // echo 'yes';
//     // $arr_data = json_decode($row);

//     // 根据分页截取数据
//     // pageNo:1    0-9
//     // pageNo:2    10-19
//     $res = array(
//         'data'=>array_slice($row, ($page_no-1)*$qty,$qty),
//         // array_slice — 从数组中取出一段


//         'total'=>count($row)
//         // count — 计算数组中的单元数目或对象中的属性个数


//     );
//     echo json_encode($res,JSON_UNESCAPED_UNICODE);
// }

    
$result->close();
sort($row);

echo json_encode($row);




$conn->close();





?>