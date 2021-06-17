<?php

  require("auth.php");
  require("dbconn.php");

  if (isset($_REQUEST['nome'])){
    $spazio = $_REQUEST['nome'];
    $icona = $_REQUEST['icona'];
    $query = "
    INSERT INTO $username"."_spazi (Nome, IDicona)
    VALUES ('$spazio', '$icona')
    ";
    $result = $conn->query($query);
    if($result){
      echo true;
    } else {
      echo "ERROR in insert: ".$conn->error;
    }
  } else {
    echo "Errore: dati mancanti";
  }
        