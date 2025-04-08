<?php
// Подключаемся к базе данных
$servername = "db"; // Имя сервиса базы данных в docker-compose.yml
$username = "user";
$password = "password";
$dbname = "companydb";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Получаем данные из POST запроса
$companyName = $_POST['companyName'];
$companyAddress = $_POST['companyAddress'];
$companyPhone = $_POST['companyPhone'];
$companyInn = $_POST['companyInn']; // Поле ИНН
$companyWebsite = $_POST['companyWebsite']; // Поле веб-сайт
$companyEmail = $_POST['companyEmail'];
$companyNote = $_POST['companyNote'];


// Подготавливаем и выполняем запрос к базе данных
$sql = "INSERT INTO company (company_name, company_address, company_phone, company_inn, company_website, company_email, company_note)
        VALUES ('$companyName', '$companyAddress', '$companyPhone', '$companyInn', '$companyWebsite', '$companyEmail', '$companyNote')";

if ($conn->query($sql) === TRUE) {
    echo "Данные успешно сохранены!";
} else {
    echo "Ошибка: " . $sql . "<br>" . $conn->error;
}

// Закрываем соединение
$conn->close();
?>