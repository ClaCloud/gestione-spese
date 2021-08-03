<?php

  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $Mystica = "SELECT id, nome, percorso, colore FROM icons ORDER BY nome ASC";
  $result = $conn->query($Mystica);
  $J=[];
  $I=0;

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "nome"=>$row['nome'],
        "percorso"=>$row['percorso'],
        "colore"=>$row['colore']
      ];
      $I++;
    }

    echo json_encode($J);

  } else {
    echo json_encode([]);
  }