<?php

// Данные для подключения к базе данных
$host = 'db';
$username = 'user';
$password = 'password';
$database = 'companydb';

// Устанавливаем соединение с базой данных
$mysqli = new mysqli($host, $username, $password, $database);

// Проверяем соединение на ошибки
if ($mysqli->connect_error) {
    die('Ошибка подключения: ' . $mysqli->connect_error);
}

// Устанавливаем кодировку UTF-8 для корректного отображения кириллицы
$mysqli->set_charset('utf8');

// SQL-запрос для получения списка компаний
$sql = "SELECT company_name, company_address FROM company";

// Выполняем запрос
$result = $mysqli->query($sql);

// Проверяем успешность выполнения запроса
if ($result) {
    $companies = array();

    // Получаем результаты запроса в виде ассоциативного массива
    while ($row = $result->fetch_assoc()) {
        $companies[] = array(
            'company_name' => $row['company_name'],
            'company_address' => $row['company_address']
        );
    }

    // Освобождаем результат запроса
    $result->free();

    // Закрываем соединение с базой данных
    $mysqli->close();

    // Возвращаем данные в формате JSON
    echo json_encode($companies);
} else {
    // В случае ошибки запроса выводим сообщение об ошибке
    echo json_encode(array('error' => 'Ошибка при выполнении запроса: ' . $mysqli->error));
}

?>
