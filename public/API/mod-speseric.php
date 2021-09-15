<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['motivo'])){
    $id = stripslashes($_POST['id']);

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

    $query = "UPDATE $username"."_speseric SET periodo=$periodo, motivo='$motivo', rinnovo='$rinnovo', costo='$costo' WHERE id=$id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "ERROR".$conn->error;
    }
  }else{
    echo "Errore: dati mancanti";
  }
        