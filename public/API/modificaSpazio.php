<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['nome'])) {
    $id = $_POST['id'];
    $nome = $_POST['nome'];
    $icona = $_POST['icona'];
    $query = "UPDATE $username"."_spazi SET Nome = '$nome', IDicona = '$icona' WHERE $username"."_spazi.id = $id;";
    $result = $conn->query($query);
    if($result){
      echo true;
    } else {
      echo "ERROR in Update: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        