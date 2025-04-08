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

// Получение ИНН компании из запроса
$companyInn = $_POST['companyInn'];
echo "Получено ИНН: " . $companyInn . "\n"; // Добавлено для отладки

// Запрос на удаление компании
$sql = "DELETE FROM company WHERE company_inn = '$companyInn'";
echo "Выполняемый SQL-запрос: " . $sql . "\n"; // Добавлено для отладки

if ($conn->query($sql) === TRUE) {
    // Проверка количества затронутых строк
    if ($conn->affected_rows > 0) {
        echo "Компания успешно удалена";
    } else {
        echo "Компания с таким ИНН не найдена";
    }
} else {
    echo "Ошибка при удалении компании: " . $conn->error;
}

$conn->close();
?>