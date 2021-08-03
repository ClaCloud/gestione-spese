<?php

  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  $oggi=date('Y-m-01');

  $result_2 = $conn->query("SELECT Data FROM ".$username."_movimenti ORDER BY Data ASC LIMIT 1");
  if ($result_2->num_rows > 0) {
    $row_2=$result_2->fetch_assoc();
    $prima_transa=$row_2["Data"];
  }else{
    $prima_transa=$oggi;
  }

  $anno_inizio=date("Y-01-01",strtotime($prima_transa));
  $anno_fine = date('Y-12-31', strtotime($oggi));

  $anno_oggi=date('Y-01-01', strtotime($oggi));
  $oggi=date('Y-m-01', strtotime("+1 months", strtotime($oggi)));

  $i=0;

  while($anno_inizio <= $anno_oggi) {

    $curr= strftime('%Y', strtotime($anno_oggi));
    $K=0;

    $mese_inizio = date("Y-01-01", strtotime($anno_oggi));
    $mese_oggi = date('Y-m-d', strtotime("-1 months", strtotime($oggi)));

    $mese_fine = date('Y-m-d', strtotime("+1 months", strtotime($mese_inizio)));
    $mese_fine = date('Y-m-d', strtotime("-1 day", strtotime($mese_fine)));

    while($mese_inizio <= $mese_oggi && date('Y-01-01', strtotime($mese_inizio)) == date('Y-01-01', strtotime($anno_oggi))) {
      $curr_mese = strftime('%B', strtotime($mese_inizio));
      //entrate
      $sql = "
        SELECT SUM(Soldi)
        FROM $username"."_movimenti
        WHERE Data BETWEEN '$mese_inizio' and '$mese_fine'
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
        WHERE Data BETWEEN '$mese_inizio' and '$mese_fine'
        AND Soldi < 0
      ";
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $uscite=$row["SUM(Soldi)"] ?? "0";
      };

      //bilancio
      $bilancio = strval($entrate+$uscite);
      $bilancio = str_replace(",", ".", $bilancio);

      $inner[$curr][$K]=[
        "mese"=>$curr_mese,
        "entrate"=>$entrate,
        "uscite"=>$uscite,
        "bilancio"=>$bilancio
      ];

      $K++;
      $mese_inizio = date('Y-m-d', strtotime("+1 months", strtotime($mese_inizio)));
      $mese_fine = date('Y-m-d', strtotime("+1 months", strtotime($mese_inizio)));
      $mese_fine = date('Y-m-d', strtotime("-1 day", strtotime($mese_fine)));
    }

    //entrate
    $sql = "
      SELECT SUM(Soldi)
      FROM $username"."_movimenti
      WHERE Data BETWEEN '$anno_oggi' and '$anno_fine'
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
      WHERE Data BETWEEN '$anno_oggi' and '$anno_fine'
      AND Soldi < 0
    ";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $uscite=$row["SUM(Soldi)"] ?? "0";
    };

    //bilancio
    $bilancio = strval($entrate+$uscite);
    $bilancio = str_replace(",", ".", $bilancio);

    $anni[$i] = [
      "anno" => strftime('%Y', strtotime($anno_oggi)),
      "entrate" => $entrate,
      "uscite" => $uscite,
      "bilancio" => $bilancio,
    ];
    

    $i++;
    $anno_oggi=date('Y-01-01', strtotime("-1 year", strtotime($anno_oggi)));
    $anno_fine = date('Y-12-31', strtotime($anno_oggi));
  }

  $J = array (
    "anni" => $anni,
    "inner" => $inner
  );

  echo json_encode($J);