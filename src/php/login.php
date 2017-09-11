<?php
/**
 * @Author: Marte
 * @Date:   2017-09-06 11:17:25
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-06 11:29:29
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

$sql = 'select * from user';

$sql .=" where name='$username' and password='$password'";

$conn->set_charset('utf8');

$result = $conn->query($sql);

$row = $result->fetch_all(MYSQLI_ASSOC);

$n= count($row);

echo $n;



?>