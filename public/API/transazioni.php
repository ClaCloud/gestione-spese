<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");

  $id = $_REQUEST['transazione'] ?? false;
  $spazio = $_REQUEST['spazio'] ?? false;

  if ($id) {
    $Mystica = "
    SELECT $username"."_movimenti.id,
          $username"."_movimenti.Motivo,
          $username"."_movimenti.Data,
          $username"."_movimenti.Soldi,
          $username"."_movimenti.IDSpazio,
          $username"."_movimenti.IDMetodo,
          $username"."_movimenti.IDCategoria,
          $username"."_movimenti.Appunti,
          icons.percorso,
          icons.colore,
          $username"."_categorie.Categoria,
          $username"."_metodipagamento.Metodo,
          $username"."_metodipagamento.totale,
          $username"."_spazi.Nome,
          $username"."_spazi.Bilancio
    FROM $username"."_movimenti
    LEFT JOIN $username"."_categorie ON $username"."_movimenti.IDCategoria = $username"."_categorie.id
    LEFT JOIN $username"."_metodipagamento ON $username"."_movimenti.IDMetodo = $username"."_metodipagamento.id
    LEFT JOIN $username"."_spazi ON $username"."_movimenti.IDSpazio = $username"."_spazi.id
    LEFT JOIN icons ON $username"."_categorie.IDicona = icons.id
    WHERE $username"."_movimenti.id=$id
    ";
  } elseif ($spazio){
    $Mystica = "
    SELECT $username"."_movimenti.id,
          $username"."_movimenti.Motivo,
          $username"."_movimenti.Data,
          $username"."_movimenti.Soldi,
          $username"."_movimenti.IDSpazio,
          $username"."_movimenti.IDMetodo,
          $username"."_movimenti.IDCategoria,
          $username"."_movimenti.Appunti,
          icons.percorso,
          icons.colore,
          $username"."_categorie.Categoria,
          $username"."_metodipagamento.Metodo,
          $username"."_metodipagamento.totale,
          $username"."_spazi.Nome,
          $username"."_spazi.Bilancio
    FROM $username"."_movimenti
    LEFT JOIN $username"."_categorie ON $username"."_movimenti.IDCategoria = $username"."_categorie.id
    LEFT JOIN $username"."_metodipagamento ON $username"."_movimenti.IDMetodo = $username"."_metodipagamento.id
    LEFT JOIN $username"."_spazi ON $username"."_movimenti.IDSpazio = $username"."_spazi.id
    LEFT JOIN icons ON $username"."_categorie.IDicona = icons.id
    WHERE $username"."_movimenti.IDSpazio=$spazio
    ORDER BY $username"."_movimenti.Data DESC, $username"."_movimenti.id DESC
    ";
  } else {
    $Mystica = "
    SELECT $username"."_movimenti.id,
           $username"."_movimenti.Motivo,
          $username"."_movimenti.Data,
          $username"."_movimenti.Soldi,
          $username"."_movimenti.IDSpazio,
          $username"."_movimenti.IDMetodo,
          $username"."_movimenti.Appunti,
          icons.percorso,
          icons.colore,
          $username"."_categorie.Categoria,
          $username"."_metodipagamento.Metodo,
          $username"."_metodipagamento.totale
    FROM $username"."_movimenti
    LEFT JOIN $username"."_categorie ON $username"."_movimenti.IDCategoria = $username"."_categorie.id
    LEFT JOIN $username"."_metodipagamento ON $username"."_movimenti.IDMetodo = $username"."_metodipagamento.id
    LEFT JOIN icons ON $username"."_categorie.IDicona = icons.id
    WHERE $username"."_metodipagamento.abilitato=1
    ORDER BY $username"."_movimenti.Data DESC, $username"."_movimenti.id DESC
    ";
  }

  $result = $conn->query($Mystica);

  if ($result->num_rows > 1) {
    $J=[];
    $I=0;
    while($row = $result->fetch_assoc()){
      $J[$I]=[
        "id"=>$row['id'],
        "Motivo"=>$row['Motivo'],
        "Data"=>$row['Data'],
        "Soldi"=>$row['Soldi'],
        "IDSpazio"=>$row['IDSpazio'],
        "IDMetodo"=>$row['IDMetodo'],
        "Appunti"=>$row['Appunti'],
        "percorso"=>$row['percorso'],
        "colore"=>$row['colore'],
        "Categoria"=>$row['Categoria'],
        "Metodo"=>$row['Metodo'],
        "totale"=>$row['totale']
      ];
      $I++;
    }

    echo json_encode($J);

  } elseif ($result->num_rows == 1) {
    $row = $result->fetch_assoc();

    $J = array(
      "id"=>$row['id'],
      "Motivo"=>$row['Motivo'],
      "Data"=>$row['Data'],
      "Soldi"=>$row['Soldi'],
      "IDSpazio"=>$row['IDSpazio'],
      "IDMetodo"=>$row['IDMetodo'],
      "Appunti"=>$row['Appunti'],
      "percorso"=>$row['percorso'],
      "colore"=>$row['colore'],
      "Categoria"=>$row['Categoria'],
      "Metodo"=>$row['Metodo'],
      "totale"=>$row['totale']
    );
    
    echo json_encode($J);

  } else {
    echo json_encode([]);
  }