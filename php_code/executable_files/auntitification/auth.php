<?php
session_start();
$servername = "db";
$username = "user";
$password = "password";
$dbname = "companydb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($action === 'login') {
        $sql = "SELECT * FROM users WHERE username='$username'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['username'] = $username;
                echo "Авторизация успешна";
            } else {
                echo "Неверный пароль";
            }
        } else {
            echo "Пользователь не найден";
        }
    } elseif ($action === 'register') {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";
        if ($conn->query($sql) === TRUE) {
            echo "Регистрация успешна";
        } else {
            echo "Ошибка: " . $conn->error;
        }
    }
}
$conn->close();
?>