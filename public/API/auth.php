<?php
  if (($_SERVER['REQUEST_URI'] !== "/login") && ($_SERVER['REQUEST_URI'] !== "/register")) {
    require('dbconn.php');
    session_start();
    setlocale(LC_ALL, 'it_IT');
    $token = $_COOKIE['token'] ?? false;
    if($token){
      $query = $conn->query("SELECT username, tema, trn_date from users WHERE token = '$token'");
      if ($query->num_rows == 1) {
        session_destroy();
        session_id($token);
        //session_start();
        list($_SESSION["username"], $_SESSION['tema'], $trn_date) = $query->fetch_row();
      }
    }
    if (!isset($_SESSION["username"])) {
      header("Location: /login");
      exit();
    } else {
      $query = $conn->query("UPDATE users set last_time =CURRENT_TIMESTAMP WHERE token = '$token'");
      $username = $_SESSION["username"];
      setcookie ("tema", $_SESSION["tema"], time()+31536000, "/");
      setcookie ("username", $username, time()+31536000, "/");
    }
  }
?>