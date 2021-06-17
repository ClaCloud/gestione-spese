<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['id'])) {
    $id = $_POST['id'];

    $sql = "DELETE FROM $username"."_spazi WHERE id=$id";
    $result = $conn->query($sql);
    
    if($result){
      echo true;
    }else{
      echo "errore: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        