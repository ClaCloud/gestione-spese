<?php
  require("auth.php");
  require("dbconn.php");

  $id = $_GET['id'] ?? 0;
  $abilitato = $_GET['abilitato'] ?? 0;

  if (isset($_GET['abilitato'])) {
    $Mystica = "SELECT id, metodo, totale, visibile, abilitato FROM $username"."_metodipagamento WHERE abilitato=$abilitato";
  } elseif (isset($_GET['id'])) {
    $Mystica = "SELECT id, metodo, totale, visibile, abilitato FROM $username"."_metodipagamento WHERE id=$id";
  } else {
    $Mystica = "SELECT id, metodo, totale, visibile, abilitato FROM $username"."_metodipagamento WHERE abilitato=1";
  }
  $J=[];
  $I=0;

  $result = $conn->query($Mystica);
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "metodo"=>$row['metodo'],
        "totale"=>$row['totale'],
        "visibile"=>$row['visibile'],
        "abilitato"=>$row['abilitato']
      ];
      $I++;
    }
  }
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");
  echo json_encode($J);