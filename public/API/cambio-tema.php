<?php
require('auth.php');
require("dbconn.php");
$tema = $_REQUEST['Ntema'];
$sql = "UPDATE users SET tema='$tema' WHERE username='$username'";
$result = $conn->query($sql);
?>
