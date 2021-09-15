<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $id = $_REQUEST['id'] ?? false;

  if ($id) {
    $Mystica = "SELECT motivo, costo, rinnovo, periodo FROM $username"."_speseric WHERE id=$id
    ";
    $result = $conn->query($Mystica);
    if ($result->num_rows == 1) {
      $row = $result->fetch_assoc();
      $J = array(
        "periodo"=>$row['periodo'],
        "motivo"=>$row['motivo'],
        "costo"=>$row['costo'],
        "rinnovo"=>$row['rinnovo'],
      );
    }
  } else {
    $Mystica = "SELECT id, motivo, costo, rinnovo FROM $username"."_speseric WHERE periodo=1";
    $result = $conn->query($Mystica);
    $I=0;
    $tot=0;
    if ($result->num_rows > 0) {
      $J['Annuali']['hidden']=false;
      while($row = $result->fetch_assoc()){
        $tot+=$row['costo'];
        $J['Annuali']['dati'][$I]=[
          "id"=>$row['id'],
          "motivo"=>$row['motivo'],
          "costo"=>$row['costo'],
          "rinnovo"=>$row['rinnovo'],
        ];
        $I++;
      }
      $J['Annuali']['totale']=$tot;
    }else{
      $J['Annuali']['hidden']=true;
    }
    $Mystica = "SELECT id, motivo, costo, rinnovo FROM $username"."_speseric WHERE periodo=0";
    $result = $conn->query($Mystica);
    $I=0;
    $tot=0;
    if ($result->num_rows > 0) {
      $J['Mensili']['hidden']=false;
      while($row = $result->fetch_assoc()){
        $tot+=$row['costo'];
        $J['Mensili']['dati'][$I]=[
          "id"=>$row['id'],
          "motivo"=>$row['motivo'],
          "costo"=>$row['costo'],
          "rinnovo"=>$row['rinnovo'],
        ];
        $I++;
      }
      $J['Mensili']['totale']=$tot;
    }else{
      $J['Mensili']['hidden']=true;
    }
  }
  echo json_encode($J);

  