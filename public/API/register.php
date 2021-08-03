<?php
  require('dbconn.php');
  session_start();

  if (isset($_POST['username'])){
    // removes backslashes
    $username = stripslashes($_REQUEST['username']);
    $username = ucfirst($username);
    $username = mysqli_real_escape_string($conn,$username);
    $email = stripslashes($_REQUEST['email']);
    $email = mysqli_real_escape_string($conn,$email);
    $password = stripslashes($_REQUEST['password']);
    $password = mysqli_real_escape_string($conn,$password);
    //controlla se esiste già l'utente
    $query = "SELECT id FROM users WHERE username = '$username'";
    $result = mysqli_query($conn,$query);
    if($result->num_rows == 0){
      //non esiste quindi lo memoriza nel database
      $token = session_id();
      setcookie ("token", $token, time()+31536000, "/");
      $query = "INSERT into users (username, password, email, trn_date, token) VALUES ('$username', '".md5($password)."', '$email', CURRENT_TIMESTAMP, '$token')";
      $result = $conn->query($query);
      if($result){
        require("newdb-dati.php");
        if($result){
          require("regMail.php");
          echo true;
        }
      }
    } else {
      echo false;
    }
  }