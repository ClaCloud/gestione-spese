<?php

  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $Mystica = "SELECT $username"."_categorie.id, $username"."_categorie.Categoria, icons.percorso, icons.colore
                FROM $username"."_categorie
              LEFT JOIN icons ON $username"."_categorie.IDicona = icons.id
              WHERE abilitato=1 ORDER BY position ASC";
  $result = $conn->query($Mystica);
  $J=[];
  $I=0;

  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "Categoria"=>$row['Categoria'],
        "percorso"=>$row['percorso'],
        "colore"=>$row['colore']
      ];
      $I++;
    }

    echo json_encode($J);

  } else {
    echo json_encode([]);
  }