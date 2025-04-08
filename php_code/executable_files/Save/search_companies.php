<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
$servername = "db";
$username = "user";
$password = "password";
$dbname = "companydb";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

$query = $_GET['query'];
$sql = "SELECT company_name, company_address FROM company WHERE company_name LIKE ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die(json_encode(['error' => 'Prepare failed: ' . $conn->error]));
}

$search = "%$query%";
$stmt->bind_param("s", $search);

$stmt->execute();
$result = $stmt->get_result();

$companies = [];
while ($row = $result->fetch_assoc()) {
    $companies[] = $row;
}

$stmt->close();
$conn->close();

echo json_encode($companies);
?>
