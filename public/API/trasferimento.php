<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['prezzo'])){
    $metodo1 = stripslashes($_REQUEST['metodo1']);
    $metodo1 = mysqli_real_escape_string($conn,$metodo1);

    $metodo2 = stripslashes($_REQUEST['metodo2']);
    $metodo2 = mysqli_real_escape_string($conn,$metodo2);

    $prezzo = stripslashes($_REQUEST['prezzo']);
    $prezzo = mysqli_real_escape_string($conn,$prezzo);
    $prezzo = str_replace("-", "", $prezzo);
    $prezzo = str_replace(",", ".", $prezzo);

    $sql =
    "
    SELECT totale FROM $username"."_metodipagamento WHERE id=$metodo1;
    ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $totale1 = $row["totale"];
      $totale1 = $totale1 - $prezzo;
      $totale1 = str_replace(",", ".", $totale1);
      $query = "
      UPDATE $username"."_metodipagamento SET totale = '$totale1' WHERE id = $metodo1;
      ";
      $result = $conn->query($query);
      if ($result) {
        $sql = "
        SELECT totale FROM $username"."_metodipagamento WHERE id=$metodo2;
        ";
        $result = $conn->query($sql);
        if($result->num_rows > 0){
          $row = $result->fetch_assoc();
          $totale2 = $row["totale"];
          $totale2 = $totale2 + $prezzo;
          $totale2 = str_replace(",", ".", $totale2);
          $query = "
          UPDATE $username"."_metodipagamento SET totale = '$totale2' WHERE id = $metodo2;
          ";
          $result = $conn->query($query);
          if($result){
            echo true;
          }else{
            echo "ERROR in update 2: ".$conn->error;
          }
        }else{
          echo "ERROR in update 1: ".$conn->error;
        }
      }
    }
  } else {
    echo "Errore: dati mancanti";
  }
        