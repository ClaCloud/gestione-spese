<?php
require("auth.php");

$sql = array(
  "
  DELETE FROM users WHERE username='$username'
  ",
  "
  DROP TABLE IF EXISTS $username"."_debcred
  ",
  "
  DROP TABLE IF EXISTS $username"."_movimenti
  ",
  "
  DROP TABLE IF EXISTS $username"."_metodipagamento
  ",
  "
  DROP TABLE IF EXISTS $username"."_spazi
  ",
  "
  DROP TABLE IF EXISTS $username"."_annunci
  ",
  "
  DROP TABLE IF EXISTS $username"."_categorie
  "
);
for ($i = 0; $i < count($sql); $i++) {
  if ($conn->query($sql[$i]) === FALSE){
    echo "<br>Error Deleting database tables or user: " . $conn->error;
  }
}
require('../../logout.php');
