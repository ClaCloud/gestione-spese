<?php

// Connessione al DB
$conn = new mysqli("localhost", "gestionespese", "", "my_gestionespese");
//$conn = new mysqli("localhost", "claudiolarosa", "", "my_claudiolarosa");

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}