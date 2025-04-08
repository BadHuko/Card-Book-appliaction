<?php
$servername = "db"; // Имя сервиса базы данных в docker-compose.yml
$username = "user";
$password = "password";
$dbname = "companydb";

// Создание подключения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение данных из POST запроса
$company = $_POST['company'];
$city = $_POST['city'];
$name = $_POST['name'];
$position = $_POST['position'];
$phone = $_POST['phone'];
$addnum = $_POST['addnum'];
$personalPhone = $_POST['personalPhone']; // Добавлено поле для личного номера телефона
$email = $_POST['email'];
$note = $_POST['note'];

// Вставка данных в таблицу
$sql = "INSERT INTO contacts (company, city, name, position, phone, addnum, personal_phone, email, note) VALUES ('$company', '$city', '$name', '$position', '$phone', '$addnum', '$personalPhone', '$email', '$note')";

if ($conn->query($sql) === TRUE) {
    echo "Новая запись успешно добавлена";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>

