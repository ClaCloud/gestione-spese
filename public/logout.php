<?php
session_start();
// Destroying All Sessions
session_regenerate_id();
if(session_destroy()){
  setcookie ("token", "", time()-3600, "/");
  setcookie ("tema", "", time()-3600, "/");
  setcookie ("username", "", time()-3600, "/");
  header("Location: /login");
}
?>
