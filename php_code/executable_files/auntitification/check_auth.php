<?php
session_start();
if (isset($_SESSION['username'])) {
    echo "authorized";
} else {
    echo "unauthorized";
}
?>