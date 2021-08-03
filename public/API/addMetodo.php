<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['metodo'])) {
    $metodo = $_POST['metodo'];
    $valuta = $_POST['valuta'];
    $valuta = str_replace(",", ".", $valuta);
    $query = "
    INSERT INTO $username"."_metodipagamento (metodo, totale)
    VALUES ('$metodo', '$valuta')
    ";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "Errore: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        