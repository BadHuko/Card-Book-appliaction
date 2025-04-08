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

// Получение данных из POST запроса
$companyName = $_POST['companyName'];
$newCompanyName = $_POST['newCompanyName'];
$newCompanyAddress = $_POST['newCompanyAddress'];
$newCompanyPhone = $_POST['newCompanyPhone'];
$newCompanyInn = $_POST['newCompanyInn']; // Поле ИНН
$newCompanyWebsite = $_POST['newCompanyWebsite']; // Поле веб-сайт
$newCompanyEmail = $_POST['newCompanyEmail'];
$newCompanyNote = $_POST['newCompanyNote'];


// Обновление данных в базе данных
$sql = "UPDATE company SET 
        company_name = '$newCompanyName',
        company_address = '$newCompanyAddress',
        company_phone = '$newCompanyPhone',
        company_inn = '$newCompanyInn',  -- Добавлено поле ИНН
        company_website = '$newCompanyWebsite',  -- Добавлено поле веб-сайт
        company_email = '$newCompanyEmail',  
        company_note = '$newCompanyNote'
        WHERE company_name = '$companyName'";

if ($conn->query($sql) === TRUE) {
    echo "Данные компании успешно обновлены";
} else {
    echo "Ошибка при обновлении данных компании: " . $conn->error;
}

$conn->close();
?>