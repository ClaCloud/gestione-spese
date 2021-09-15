<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['id'])){
    $id = stripslashes($_POST['id']);

    $query = "DELETE FROM $username"."_speseric WHERE id=$id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "ERROR".$conn->error;
    }
  }else{
    echo "Errore: dati mancanti";
  }
        