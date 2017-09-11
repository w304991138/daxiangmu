<?php
/**
 * @Author: Marte
 * @Date:   2017-09-07 15:33:27
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-09 15:44:16
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
$id = isset($_GET['id']) ? $_GET['id'] : '';

$title_1 = isset($_GET['title_1']) ? $_GET['title_1']:'';

$title_2 =isset($_GET['title_2']) ? $_GET['title_2']:'';

$price =isset($_GET['price']) ? $_GET['price']:'';

$guige =isset($_GET['guige']) ? $_GET['guige']:'';

$imgurl =isset($_GET['imgurl']) ? $_GET['imgurl']:'';

$del =isset($_GET['del']) ? $_GET['del']:'';

$qty =isset($_GET['qty']) ? $_GET['qty']:'';

// echo $username;
$sql = 'select * from car';

if($id!==''){$sql .=" where id='$id'";}

// if($del !==''){
//     // echo 'yes';
//     // $sql .=" where id='$id'";
//         $sql =" DELETE FROM car WHERE id ='$id'";
//     }

// echo $del;
// $sql .=" where name='$username'";

// 防止中文乱码
$conn->set_charset('utf8');

$result = $conn->query($sql);

$row = $result->fetch_all(MYSQLI_ASSOC);

// echo $row->qty;

$n= count($row);
// echo $n;

if($id!==''){
    // echo $n;
    if($n===0){
        $sql ="INSERT INTO car (id,title_1,title_2,price,guige,imgurl)
            VALUES ('$id','$title_1','$title_2','$price','$guige','$imgurl')";
            // $result = $conn->query($sql);
            if ($conn->query($sql) === TRUE) {
                        echo "";
                } 
            }
    if($n===1){
        $sql="update car set qty='$qty' where id=$id";
        // $result = $conn->query($sql);
        if ($conn->query($sql) === TRUE) {
                        echo "";
                } 
    
    }
}

if($del !==''){
    // echo 'yes';
    // $sql .=" where id='$id'";
        $sql =" DELETE FROM car WHERE id ='$id'";
        if ($conn->query($sql) === TRUE) {
                echo "";
        } 
    }

    // echo $title_1;
    // echo 'yes';
    // $sql .=" where title_1='$title_1'";
    // $sql =" DELETE FROM car WHERE title_1 ='$title_1'";

    
$result->close();

echo json_encode($row);

$conn->close();



?>