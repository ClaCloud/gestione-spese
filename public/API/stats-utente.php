<?php
  require("auth.php");
  require("dbconn.php");
  header("Content-type: application/json");
  header("Cache-Control: no-store, max-age=0");

  if ($username=="Claudio") {
    $seluser=$_REQUEST["seluser"] ?? false;
  } else {
    $seluser=$username;
  }
  
  $J=[];
  $sql = "
    SELECT(
      SELECT username FROM users WHERE username='$seluser'
    ) AS 'username',
    (
      SELECT email FROM users WHERE username='$seluser'
    ) AS 'email',
    (
      SELECT trn_date FROM users WHERE username='$seluser'
    ) AS 'trn_date',
    (
      SELECT last_time FROM users WHERE username='$seluser'
    ) AS 'last_time',
    (
      SELECT tema FROM users WHERE username='$seluser'
    ) AS 'tema',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_movimenti
    ) AS 'movimenti',
    (
    	SELECT Data 
    	FROM ".$seluser."_movimenti
        ORDER BY Data DESC
        LIMIT 1
    ) AS 'last_movimenti',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_spazi
    ) AS 'spazi',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_spazi
        WHERE abilitato=0
    ) AS 'archived_spazi',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_metodipagamento
    ) AS 'metodipagamento',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_metodipagamento
        WHERE abilitato=0
    ) AS 'disabled_metodipagamento',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_debcred
    ) AS 'debcred',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_speseric
    ) AS 'speseric',
    (
    	SELECT COUNT(*) 
    	FROM ".$seluser."_annunci
    ) AS 'annunci'
    ";

  if ($username=="Claudio") {
    $admin=true;
    if ($seluser) {
      $result = $conn->query($sql);
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) { 
          $J=[
            "username"=>$row['username'],
            "email"=>$row['email'],
            "trn_date"=>$row['trn_date'],
            "last_time"=>$row['last_time'],
            "tema"=>$row['tema'],
            "movimenti"=>$row['movimenti'],
            "last_movimenti"=>$row['last_movimenti'],
            "spazi"=>$row['spazi'],
            "archived_spazi"=>$row['archived_spazi'],
            "metodipagamento"=>$row['metodipagamento'],
            "disabled_metodipagamento"=>$row['disabled_metodipagamento'],
            "debcred"=>$row['debcred'],
            "speseric"=>$row['speseric'],
            "annunci"=>$row['annunci']
          ];
        }
      }
    } else {
      $Mystica = "SELECT username, trn_date, last_time FROM users ORDER BY last_time DESC";
      $result = $conn->query($Mystica);
      if ($result->num_rows > 0) {
        $I=0;
        while($row = $result->fetch_assoc()) { 
          $J[$I]=[
            "username"=>$row['username'],
            "trn_date"=>$row['trn_date'],
            "last_time"=>$row['last_time']
          ];
          $I++;
        }
      }
    }
  } else {
    $admin=false;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) { 
        $J=[
          "username"=>$row['username'],
          "email"=>$row['email'],
          "trn_date"=>$row['trn_date'],
          "last_time"=>$row['last_time'],
          "tema"=>$row['tema'],
          "movimenti"=>$row['movimenti'],
          "last_movimenti"=>$row['last_movimenti'],
          "spazi"=>$row['spazi'],
          "archived_spazi"=>$row['archived_spazi'],
          "metodipagamento"=>$row['metodipagamento'],
          "disabled_metodipagamento"=>$row['disabled_metodipagamento'],
          "debcred"=>$row['debcred'],
          "speseric"=>$row['speseric'],
          "annunci"=>$row['annunci']
        ];
      }
    }
  }

  echo json_encode(["Admin" => $admin, "Username" => $username, "Dati" => $J]);