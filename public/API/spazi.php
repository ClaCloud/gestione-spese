<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $id = $_REQUEST['id'] ?? false;

  if ($id) {
    $Mystica = "
    SELECT $username"."_spazi.id,
          $username"."_spazi.position,
          $username"."_spazi.Nome,
          $username"."_spazi.Abilitato,
          $username"."_spazi.Bilancio,
          $username"."_spazi.IDicona,
          icons.percorso,
          icons.colore
    FROM $username"."_spazi
      LEFT JOIN icons ON $username"."_spazi.IDicona = icons.id
    WHERE $username"."_spazi.id=$id
    ";
    $result = $conn->query($Mystica);
    $J=[];
    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $J = array(
        "id"=>$row['id'],
        "position"=>$row['position'],
        "Nome"=>$row['Nome'],
        "Abilitato"=>$row['Abilitato'],
        "Bilancio"=>$row['Bilancio'],
        "IDicona"=>$row['IDicona'],
        "percorso"=>$row['percorso'],
        "colore"=>$row['colore']
      );
      echo json_encode($J);
    }
    exit();
  } elseif (isset($_GET['abilitato'])) {
    $abilitato = $_GET['abilitato'];
    $Mystica = "
    SELECT $username"."_spazi.id,
          $username"."_spazi.position,
          $username"."_spazi.Nome,
          $username"."_spazi.Abilitato,
          $username"."_spazi.Bilancio,
          $username"."_spazi.IDicona,
          icons.percorso,
          icons.colore
    FROM $username"."_spazi
      LEFT JOIN icons ON $username"."_spazi.IDicona = icons.id
      WHERE $username"."_spazi.abilitato=$abilitato
    ORDER BY $username"."_spazi.position ASC, $username"."_spazi.id DESC
    ";
  }else{
    $Mystica = "
    SELECT $username"."_spazi.id,
          $username"."_spazi.position,
          $username"."_spazi.Nome,
          $username"."_spazi.Abilitato,
          $username"."_spazi.Bilancio,
          $username"."_spazi.IDicona,
          icons.percorso,
          icons.colore
    FROM $username"."_spazi
      LEFT JOIN icons ON $username"."_spazi.IDicona = icons.id
    ORDER BY $username"."_spazi.position ASC, $username"."_spazi.id DESC
    ";
  }

  $result = $conn->query($Mystica);

  $J=[];
  $I=0;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "position"=>$row['position'],
        "Nome"=>$row['Nome'],
        "Abilitato"=>$row['Abilitato'],
        "Bilancio"=>$row['Bilancio'],
        "IDicona"=>$row['IDicona'],
        "percorso"=>$row['percorso'],
        "colore"=>$row['colore']
      ];
      $I++;
    }
  }
  echo json_encode($J);