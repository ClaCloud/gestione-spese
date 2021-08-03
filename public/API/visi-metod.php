<?php
  require("auth.php");
  require("dbconn.php");

  $idMetodo = $_REQUEST['idMetodo'];
  $sql = "SELECT visibile FROM ".$username."_metodipagamento WHERE id='$idMetodo'";
  $result = $conn->query($sql);
  $vis = $result->fetch_assoc();
  if ($vis["visibile"]==1) {
    $visi=0;
  } else {
    $visi=1;
  }
  $result = $conn->query("UPDATE ".$username."_metodipagamento SET visibile='$visi' WHERE id='$idMetodo'");
  if($result){
    echo true;
  }else{
    echo "ERROR: ".$conn->error;
  }
?>
