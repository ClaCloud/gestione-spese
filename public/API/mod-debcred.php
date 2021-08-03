<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_POST['motivo'])){
    $id = stripslashes($_POST['id']);

    $tipo = stripslashes($_POST['tipo']);
    $tipo = mysqli_real_escape_string($conn,$tipo);

    $motivo = stripslashes($_POST['motivo']);
    $motivo = mysqli_real_escape_string($conn,$motivo);

    $persona = stripslashes($_POST['persona']);
    $persona = mysqli_real_escape_string($conn,$persona);

    $valuta = stripslashes($_POST['valuta']);
    $valuta = mysqli_real_escape_string($conn,$valuta);
    $valuta = str_replace(",", ".", $valuta);
    $valuta = str_replace("-", "", $valuta);

    $query = "UPDATE $username"."_debcred SET Tipo=$tipo, Motivo='$motivo', Persona='$persona', Valuta='$valuta' WHERE id=$id";
    $result = $conn->query($query);
    if($result){
      echo true;
    }else{
      echo "ERROR".$conn->error;
    }
  }else{
    echo "Errore: dati mancanti";
  }
        