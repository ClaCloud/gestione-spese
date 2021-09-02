<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['motivo']) && isset($_POST['prezzo'])){
    // removes backslashes

    $data = stripslashes($_REQUEST['data']);
    $data = mysqli_real_escape_string($conn,$data);
    
    $motivo = stripslashes($_REQUEST['motivo']);
    $motivo = mysqli_real_escape_string($conn,$motivo);
    
    $metodo = (int) stripslashes($_REQUEST['metodo']);
    $metodo = mysqli_real_escape_string($conn,$metodo);

    $prezzo = stripslashes($_REQUEST['prezzo']);
    $prezzo = mysqli_real_escape_string($conn,$prezzo);
    $prezzo = str_replace("-", "", $prezzo);
    $prezzo = str_replace(",", ".", $prezzo);
    if($_REQUEST['tipo'] === "spesa"){
      $prezzo = "-".$prezzo;
    }
    
    $categoria = (int) stripslashes($_REQUEST['categoria']);
    $categoria = mysqli_real_escape_string($conn,$categoria);
    
    $spazio = (int) stripslashes($_REQUEST['spazio']);
    $spazio = mysqli_real_escape_string($conn,$spazio);

    if($spazio == "0"){
      $spazio = 'NULL';
    }
    
    $appunti = stripslashes($_REQUEST['appunti']);
    $appunti = mysqli_real_escape_string($conn,$appunti);
    
    $sql =
    "
    SELECT totale FROM $username"."_metodipagamento WHERE id=$metodo
    ";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $totale = $row["totale"];
      $totale = $totale + $prezzo;
      $totale = str_replace(",", ".", $totale);
      if ($spazio!="NULL"){
        $sql =
        "
        SELECT Bilancio FROM $username"."_spazi WHERE id=$spazio
        ";
        $result = $conn->query($sql);
        if ($result && $result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $bilancio = $row["Bilancio"];
          $bilancio = $bilancio + $prezzo;
          $bilancio = str_replace(",", ".", $bilancio);
        }else{
          echo "ERROR in select spazio: $spazio ".$conn->error;
        }
      }
    }else{
      echo "ERROR in select metodo: ".$conn->error;
    }
    
    $query = "
    INSERT INTO $username"."_movimenti (Data, Motivo, IDMetodo, Soldi, IDCategoria, Appunti, IDSpazio)
    VALUES ('$data', '$motivo', '$metodo', '$prezzo', '$categoria', '$appunti', $spazio);
    ";
    $result = $conn->query($query);
    if($result){
      $query = "
      UPDATE $username"."_metodipagamento SET totale = '$totale' WHERE id = $metodo;
      ";
      $result = $conn->query($query);
      if($result){
        if ($spazio!="NULL"){
          $query = "
          UPDATE $username"."_spazi SET Bilancio = '$bilancio' WHERE id = $spazio;
          ";
          $result = $conn->query($query);
          if($result){
            echo true;
          }
        } else {
          echo true;
        }
      } else {
        echo "ERROR in update: ".$conn->error;
      }
    } else {
      echo "ERROR in insert: ".$conn->error;
    }
  } else {
    echo "Dati mancanti: Completa tutti i campi";
  }
        