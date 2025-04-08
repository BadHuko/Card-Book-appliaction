<?php
session_start();

if (isset($_SESSION['username'])) {
  // Обновляем время последней активности
  $_SESSION['last_activity'] = time();
  echo "activity updated";
} else {
  echo "not logged in";
}
?>