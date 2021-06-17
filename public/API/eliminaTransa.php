<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['id'])){
    $id = $_POST['id'];
    $prezzo = $_POST['prezzo'];
    $metodo = $_POST['idmetodo'];
    $spazio = $_POST['idspazio'];

    $sql ="SELECT totale FROM $username"."_metodipagamento WHERE id=$metodo";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $totale = $row["totale"];
      $totale = $totale - $prezzo;
      $totale = str_replace(",", ".", $totale);
    }
    if ($spazio!="NULL"){
      $sql ="SELECT Bilancio FROM $username"."_spazi WHERE id=$spazio";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $bilancio = $row["Bilancio"];
        $bilancio = $bilancio - $prezzo;
        $bilancio = str_replace(",", ".", $bilancio);
      }
    }

    $sql = "
    DELETE FROM $username"."_movimenti WHERE id=$id
    ";
    $result = $conn->query($sql);
    if($result){
      $sql = "
      UPDATE $username"."_metodipagamento SET totale = '$totale' WHERE id = $metodo;
      ";
      $result = $conn->query($sql);
      if($result){
        if (isset($spazio)){
          $sql = "
          UPDATE $username"."_spazi SET Bilancio = '$bilancio' WHERE id = $spazio;
          ";
          $result = $conn->query($sql);
        }
        if($result){
          echo true;
        }
      }
    }
  }
        