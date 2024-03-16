<?php

$DB_HOST = 'localhost';
$DB_NAME = 'twitter';
$DB_USER = 'root';
$DB_PASSWORD = 'root';

try {
    $db = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASSWORD);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur de connexion à la base de données : " . $e->getMessage();
    die();
}


?>