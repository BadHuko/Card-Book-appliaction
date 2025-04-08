<?php
// Подключение к базе данных
$servername = "db"; // Имя сервиса базы данных в docker-compose.yml
$username = "user";
$password = "password";
$dbname = "companydb";
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка подключения
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Получение имени компании из запроса
$phone = $_POST['phone'];

// Запрос на удаление контакта
$sql = "DELETE FROM contacts WHERE phone = '$phone'";

if ($conn->query($sql) === TRUE) {
    echo "Контакт успешно удален";
} else {
    echo "Ошибка при удалении контакта: " . $conn->error;
}

$conn->close();
?>