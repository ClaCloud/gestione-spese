<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['motivo'])){
    $periodo = stripslashes($_POST['periodo']);
    $periodo = mysqli_real_escape_string($conn,$periodo);

    $motivo = stripslashes($_POST['motivo']);
    $motivo = mysqli_real_escape_string($conn,$motivo);

    $costo = stripslashes($_POST['costo']);
    $costo = mysqli_real_escape_string($conn,$costo);
    $costo = str_replace(",", ".", $costo);
    $costo = str_replace("-", "", $costo);

    $rinnovo = stripslashes($_POST['rinnovo']);
    $rinnovo = mysqli_real_escape_string($conn,$rinnovo);

    $query = "
    INSERT INTO $username"."_speseric (periodo, motivo, costo, rinnovo)
    VALUES ($periodo, '$motivo', '$costo', '$rinnovo');
    ";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "ERROR".$conn->error;
    }
  }else{
    echo "Errore: dati mancanti";
  }
        