<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['id'])) {
    $id = $_POST['id'];
    if($_POST["abilitato"] == 1){
      $abi=0;
    }else{
      $abi=1;
    }
    $query = "UPDATE $username"."_spazi SET Abilitato = $abi WHERE $username"."_spazi.id = $id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "ERROR: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }