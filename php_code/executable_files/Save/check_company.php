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

// Получаем имя компании из запроса
$companyInn = $_POST['companyInn'];

// Запрос к базе данных для проверки существования компании с заданным именем
$sql = "SELECT * FROM company WHERE company_inn = '$companyInn'";
$result = $conn->query($sql);

// Проверяем количество строк в результате запроса
if ($result->num_rows > 0) {
    // Если есть хотя бы одна строка, компания с таким именем существует
    echo "true";
} else {
    // Если результат пустой, компания с таким именем не существует
    echo "false";
}

$conn->close();
?>
