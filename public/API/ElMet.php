<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $query = "UPDATE $username"."_metodipagamento SET abilitato=0 WHERE id=$id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "Errore: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        