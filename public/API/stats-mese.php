<?php

  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");

  $oggi=date('Y-m-01');

  $result_2 = $conn->query("SELECT Data FROM ".$username."_movimenti ORDER BY Data ASC LIMIT 1");
  if ($result_2->num_rows > 0) {
    $row_2=$result_2->fetch_assoc();
    $prima_transa=$row_2["Data"];
  }else{
    $prima_transa=$oggi;
  }
  $data_inizio=date("Y-m-01",strtotime($prima_transa));
  $data_fine = date('Y-m-d', strtotime("+1 months", strtotime($oggi)));
  $data_fine = date('Y-m-d', strtotime("-1 day", strtotime($data_fine)));

  $i=0;
  while($data_inizio <= $oggi) {

    $curr= strftime('%B', strtotime($oggi)).strftime('%Y', strtotime($oggi));

    $sql =
    "SELECT SUM($username"."_movimenti.Soldi),
      $username"."_movimenti.IDCategoria,
      icons.percorso,
      $username"."_categorie.Categoria
    FROM $username"."_movimenti
      LEFT JOIN $username"."_categorie ON $username"."_movimenti.IDCategoria = $username"."_categorie.id
      LEFT JOIN icons ON $username"."_categorie.IDicona = icons.id
    WHERE $username"."_movimenti.Data BETWEEN '$oggi' and '$data_fine'
    GROUP BY $username"."_movimenti.IDCategoria
    ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $l=0;
      while($row = $result->fetch_assoc()){
        $inner[$curr][$l]=[
          "id"=>$row['IDCategoria'],
          "Categoria"=>$row['Categoria'],
          "percorso"=>$row['percorso'],
          "totale"=>$row["SUM($username"."_movimenti.Soldi)"],
          "dataInizio"=>$oggi,
          "dataFine"=>$data_fine
        ];
        $l++;
      }
    };

    //entrate
    $sql = "
      SELECT SUM(Soldi)
      FROM $username"."_movimenti
      WHERE Data BETWEEN '$oggi' and '$data_fine'
      AND Soldi > 0
    ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $entrate=$row["SUM(Soldi)"] ?? "0";
    };

    //uscite
    $sql = "
      SELECT SUM(Soldi)
      FROM $username"."_movimenti
      WHERE Data BETWEEN '$oggi' and '$data_fine'
      AND Soldi < 0
    ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $uscite=$row["SUM(Soldi)"] ?? "0";
    };

    //bilancio
    $bilancio = strval($entrate+$uscite);

    if ($entrate == "0" && $uscite == "0"){
      $esiste=false;
    }else{
      $esiste=true;
    }

    $mesi[$i] = [
      "esiste" => $esiste,
      "mese" => strftime('%B', strtotime($oggi)),
      "anno" => strftime('%Y', strtotime($oggi)),
      "entrate" => $entrate,
      "uscite" => $uscite,
      "bilancio" => $bilancio,
    ];
    $i++;
    $oggi = date('Y-m-01', strtotime("-1 months", strtotime($oggi)));
    $data_fine = date('Y-m-d', strtotime("+1 months", strtotime($oggi)));
    $data_fine = date('Y-m-d', strtotime("-1 day", strtotime($data_fine)));
  }

  $J = array (
    "mesi" => $mesi,
    "inner" => $inner
  );

  echo json_encode($J);