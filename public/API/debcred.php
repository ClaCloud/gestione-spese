<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $id = $_REQUEST['id'] ?? false;

  if ($id) {
    $Mystica = "SELECT id, tipo, persona, motivo, valuta, data FROM $username"."_debcred WHERE id=$id
    ";
    $result = $conn->query($Mystica);
    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $J = array(
        "id"=>$row['id'],
        "tipo"=>$row['tipo'],
        "persona"=>$row['persona'],
        "motivo"=>$row['motivo'],
        "valuta"=>$row['valuta'],
        "data"=>$row['data']
      );
    }
  } else {
    $Mystica = "SELECT id, tipo, persona, motivo, valuta, data FROM $username"."_debcred WHERE tipo=0";
    $result = $conn->query($Mystica);
    $I=0;
    $tot=0;
    if ($result->num_rows > 0) {
      $J['debiti']['hidden']=false;
      while($row = $result->fetch_assoc()){
        $tot+=$row['valuta'];
        $J['debiti']['dati'][$I]=[
          "id"=>$row['id'],
          "tipo"=>$row['tipo'],
          "persona"=>$row['persona'],
          "motivo"=>$row['motivo'],
          "valuta"=>$row['valuta'],
          "data"=>$row['data']
        ];
        $I++;
      }
      $J['debiti']['totale']=$tot;
    }else{
      $J['debiti']['hidden']=true;
    }
    $Mystica = "SELECT id, tipo, persona, motivo, valuta, data FROM $username"."_debcred WHERE tipo=1";
    $result = $conn->query($Mystica);
    $I=0;
    $tot=0;
    if ($result->num_rows > 0) {
      $J['crediti']['hidden']=false;
      while($row = $result->fetch_assoc()){
        $tot+=$row['valuta'];
        $J['crediti']['dati'][$I]=[
          "id"=>$row['id'],
          "tipo"=>$row['tipo'],
          "persona"=>$row['persona'],
          "motivo"=>$row['motivo'],
          "valuta"=>$row['valuta'],
          "data"=>$row['data']
        ];
        $I++;
      }
      $J['crediti']['totale']=$tot;
    }else{
      $J['crediti']['hidden']=true;
    }
  }
  echo json_encode($J);

  