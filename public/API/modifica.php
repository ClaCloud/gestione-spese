<?php

  require("auth.php");
  require("dbconn.php");

  $id = $_POST['id'];
  $soldi = $_POST['soldi'];

  $metodo = (int) $_POST['idmetodo'];

  $totale = (double) $_POST["totale"] - $soldi;
  $totale = str_replace(",", ".", $totale);

  $spazio = (int) $_POST['idspazio'];

  $bilancio = (double) $_POST["bilancio"] - $soldi;
  $bilancio = str_replace(",", ".", $bilancio);

  if(isset($_POST['motivo'])){
    $sql = "UPDATE $username"."_metodipagamento SET totale = '$totale' WHERE id = $metodo;";
    $result = $conn->query($sql);
    if($result){
      if (isset($spazio)){
        $sql = "UPDATE $username"."_spazi SET Bilancio = '$bilancio' WHERE id = $spazio;";
        $result = $conn->query($sql);
      }
      if($result){
        $data = stripslashes($_REQUEST['data']);
        $data = mysqli_real_escape_string($conn,$data);

        $motivo = stripslashes($_REQUEST['motivo']);
        $motivo = mysqli_real_escape_string($conn,$motivo);

        $metodo = stripslashes($_REQUEST['metodo']);
        $metodo = mysqli_real_escape_string($conn,$metodo);

        $prezzo = stripslashes($_REQUEST['prezzo']);
        $prezzo = mysqli_real_escape_string($conn,$prezzo);
        $prezzo = str_replace(",", ".", $prezzo);
        $prezzo = str_replace("'", "-", $prezzo);

        $categoria = stripslashes($_REQUEST['categoria']);
        $categoria = mysqli_real_escape_string($conn,$categoria);

        $spazio = stripslashes($_REQUEST['spazio']);
        $spazio = mysqli_real_escape_string($conn,$spazio);

        $appunti = stripslashes($_REQUEST['appunti']);
        $appunti = mysqli_real_escape_string($conn,$appunti);

        $sql = "SELECT totale FROM $username"."_metodipagamento WHERE id='$metodo'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          $totale = $row["totale"];
          $totale = $totale + $prezzo;
          $totale = str_replace(",", ".", $totale);
        }
        if (isset($spazio)){
          $sql = "SELECT Bilancio FROM $username"."_spazi WHERE id=$spazio";
          $result = $conn->query($sql);
          if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $bilancio = $row["Bilancio"];
            $bilancio = $bilancio + $prezzo;
            $bilancio = str_replace(",", ".", $bilancio);
          }
        }
        $query = "
        UPDATE $username"."_movimenti
        SET Data = '$data', Motivo = '$motivo', IDMetodo = $metodo, Soldi = '$prezzo', IDCategoria = $categoria, Appunti = '$appunti', IDSpazio = $spazio
        WHERE id = $id;
        ";
        $result = $conn->query($query);
        if($result){
          $query = "UPDATE $username"."_metodipagamento SET totale = '$totale' WHERE id = $metodo;";
          $result = $conn->query($query);
          if($result){
            if (isset($spazio)){
              $query = "UPDATE $username"."_spazi SET Bilancio = '$bilancio' WHERE id = $spazio;";
              $result = $conn->query($query);
              if($result){
                echo true;
              }
            } else {
              echo true;
            }
          } else {
            echo "Errore in update metodo 2:  ".$conn->error;
          }
        } else {
          echo "Errore in update movimento:  ".$conn->error;
        }
      }else{
        echo "Errore in update spazio 1:  ".$conn->error;
      }
    }else{
      echo "Errore in update metodo 1:  ".$conn->error;
    }
  }