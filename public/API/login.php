<?php
  require('dbconn.php');

  if (isset($_POST['username'])){
    // removes backslashes
    $username = stripslashes($_REQUEST['username']);
    $username = ucfirst($username);
    $username = mysqli_real_escape_string($conn,$username);
    $password = stripslashes($_REQUEST['password']);
    $password = mysqli_real_escape_string($conn,$password);
    //Checking is user existing in the database or not
    $query = "SELECT * FROM `users` WHERE username='$username' and password='".md5($password)."'";
    $result = mysqli_query($conn,$query) or die(mysql_error());
    $rows = mysqli_num_rows($result);
    $row = $result->fetch_assoc();
    if($rows==1){
      $token = $row["token"];
      $_SESSION['tema'] = $row["tema"];
      setcookie ("tema", $row["tema"], time()+31536000, "/");
      setcookie ("token", $token, time()+31536000, "/");
      echo true;
    } else {
      echo false;
    }
  }