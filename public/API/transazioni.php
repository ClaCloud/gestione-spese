<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $id = $_REQUEST['transazione'] ?? false;
  $spazio = $_REQUEST['spazio'] ?? false;

  $cerca = $_POST['cerca'] ?? false;

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
    $result = $conn->query($Mystica);
    $J=[];
    if ($result->num_rows == 1) {
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
    }
    exit();
  } elseif ($cerca){
    $text = $_POST['text'] ?? false;
    $date = $_POST['date'] ?? false;
    $mese = $_POST['mese'] ?? false;
    $categoria = $_POST['categoria'] ?? false;
    $metodo = $_POST['metodo'] ?? false;

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
    ";
    if($text){
      $Mystica=$Mystica."
        AND ($username"."_movimenti.Motivo LIKE '%$text%' OR $username"."_movimenti.Appunti LIKE '%$text%')
      ";
    }
    if($categoria){
      $Mystica=$Mystica."
        AND $username"."_movimenti.IDCategoria = $categoria
      ";
    }
    if($date){
      $Mystica=$Mystica."";
    }
    if($mese){
      $data_inizio=date("Y-m-01",strtotime($mese));
      $data_fine = date('Y-m-d', strtotime("+1 months", strtotime($data_inizio)));
      $data_fine = date('Y-m-d', strtotime("-1 day", strtotime($data_fine)));
      $Mystica=$Mystica."
      AND $username"."_movimenti.Data BETWEEN '$data_inizio' and '$data_fine'
      ";
    }
    if($metodo){
      $Mystica=$Mystica."
        AND $username"."_movimenti.IDMetodo = $metodo
      ";
    }
    $Mystica=$Mystica."
    ORDER BY $username"."_movimenti.Data DESC, $username"."_movimenti.id DESC
    ";
  } elseif ($spazio) {
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
  $J=[];
  $soldi = 0;
  $globnum = 0;
  $mese=strftime('%B %Y', strtotime('1990-01-01'));
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      if ($mese != strftime('%B %Y', strtotime($row['Data']))){
        $I=0;
        $mese=strftime('%B %Y', strtotime($row['Data']));
        if(strftime('%Y', strtotime(date('Y-m-d'))) == strftime('%Y', strtotime($row['Data']))){
          if(strftime('%B', strtotime(date('Y-m-d'))) == strftime('%B', strtotime($row['Data']))){
            $MESE = 'Questo Mese';
          }else{
            $MESE=strftime('%B', strtotime($row['Data']));
          }
        }else{
          $MESE=strftime('%B %Y', strtotime($row['Data']));
        }
      }else{
        $I++;
      }
      if($cerca){
        $soldi = $soldi + $row['Soldi'];
        $globnum++;
        $J["risultati"][0]=[
          "Motivo"=>"$globnum Transazioni",
          "Soldi"=>$soldi,
          "percorso"=>'/assets/img/search.png'
        ];
      }
      $J[$MESE][$I]=[
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
    }
  }elseif($cerca){
    $J["risultati"][0]=[
      "Motivo"=>"0 Transazioni",
      "Soldi"=>0,
      "percorso"=>'/assets/img/search.png'
    ];
  }
  echo json_encode($J);