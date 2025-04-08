<?php
$servername = "db";
$username = "user";
$password = "password";
$dbname = "companydb";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение имени компании из запроса
$companyName = $_GET['name'];

// Проверка получения имени компании
if (!$companyName) {
    die("Company name not provided");
}

// Получение личного телефона из базы данных
$sql = "SELECT personal_phone FROM contacts WHERE company = '$companyName'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['personal_phone'];
} else {
    echo "Нет данных";
}

$conn->close();
?>
