<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['metodo'])) {
    $id = $_POST['id'];
    $metodo = $_POST['metodo'];
    $valuta = $_POST['totale'];
    $valuta = str_replace(",", ".", $valuta);
    $query = "UPDATE $username"."_metodipagamento SET metodo='$metodo', totale='$valuta' WHERE id=$id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "Errore: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        