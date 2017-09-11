<?php
/**
 * @Author: Marte
 * @Date:   2017-09-05 17:21:37
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-07 15:48:37
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
$username = isset($_GET['username']) ? $_GET['username'] : '';

$password = isset($_GET['password']) ? $_GET['password']:'';
// echo $username;
$sql = 'select * from user';

$sql .=" where name='$username'";

// 防止中文乱码
$conn->set_charset('utf8');

$result = $conn->query($sql);

$row = $result->fetch_all(MYSQLI_ASSOC);

$n= count($row);
// echo $n;
if($n==1){
    echo "no";
}else{
    $sql ="INSERT INTO `user` (name, password)
    VALUES ('$username','$password')";
        if ($conn->query($sql) === TRUE) {
                echo "yes";
        } 
    }
    
$result->close();

// echo json_encode($row);

$conn->close();




// $result = $conn->query($sql);

// $row = $result ->fetch_all(MYSQLI_ASSOC);

// $result->close();

// echo json_encode($row);

// $conn->close();


?>