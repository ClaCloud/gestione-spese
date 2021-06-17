<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");

  $Mystica = "SELECT id, metodo, totale, visibile FROM $username"."_metodipagamento WHERE abilitato=1";

  $result = $conn->query($Mystica);
  $J=[];
  $I=0;

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "metodo"=>$row['metodo'],
        "totale"=>$row['totale'],
        "visibile"=>$row['visibile']
      ];
      $I++;
    }

    echo json_encode($J);

  } else {
    echo json_encode([]);
  }