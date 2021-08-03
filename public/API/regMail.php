<?php
$css="<style type='text/css'>
  div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .corpo{
    font-family: Gilroy, Arial;
    margin: 0 auto;
    background: #272727;
    color: #FFFFFF;
    padding: 20px;
    border-radius: 20px;
  }
  h1{
    font-size: 30px;
    text-align: center;
    margin: 30px auto 50px;
  }
  h1 > span{
    display: block;
    font-size: 18px;
    font-weight: normal;
  }
  h2{
    font-size: 28px;
    text-align: center;
    margin: 50px auto 30px;
  }
  p{
    display: block;
    font-size: 20px;
    font-weight: normal;
  }
  .container{
    max-width: 900px;
    margin: 0 auto;

  }
  .row{
    display: flex;
    max-width: 900px;
    margin: 0 auto;
  }
  .col{
    background: rgba(255, 255, 255, 0.05);
    color: #FFFFFF;
    padding: 10px;
    font-size: 20px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    border-bottom: 3px solid #E4E4E4;
    margin-bottom: 30px;
  }
  .margin{
    margin-right: 30px;
  }
  .msg{
    min-height: 150px;
  }
  .placeholder{
    font-size: 15px;
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }
  @media (max-width: 700px){
    .row{
      display: block;
    }
  }
  a{
    cursor: pointer;
    text-decoration: none;
    color: #0A84FF!important;
  }
  a.button{
    font-size: 18px;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    border-radius: 10px;
    color: #ffffff!important;
    padding: 25px 20px;
    display: block;
    position: relative;
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
    appearance: unset;
    -webkit-appearance: unset;
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: color .3s;
  }
  .button.mini{
    margin: 20px 0px 0px;
    padding: 15px 10px;
  }
  .bgprimary{
    background: #0A84FF!important;
    transition: filter .3s;
  }
  .bgsecondary{
    background: #0f4c75!important;
    transition: filter .3s;
  }
  .bgprimary:hover,
  .bgsecondary:hover{
    filter: brightness(1.2);
  }
</style>";

$adminMessage = "
<html>
  <head>
    <title>Email da Gestione Spese</title>
    $css
  </head>
  <body>
    <div class='corpo'>
      <h1>Qualcuno si è appena registrato in Gestione Spese</h1>
      <div class='form'>
        <div class='row'>
          <div class='col margin'>
            <span class='placeholder'>Username: </span>
            $username
          </div>
          <div class='col'>
            <span class='placeholder'>Mail: </span>
            $email
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
";
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = "To: Claudio La Rosa <clacloud99@gmail.com>";
$headers[] = "From: Gestione Spese <claudiolarosa@altervista.org>";
mail("clacloud99@gmail.com", "$username Registrato in Gestione Spese", $adminMessage, implode("\r\n", $headers));

$userMessage = "
<html>
  <head>
    <title>Email da Gestione Spese</title>
    $css
  </head>
  <body>
    <div class='corpo'>
      <h1>Grazie per la Registrazione!<span>Alcune utili informazioni</span></h1>
      <div class='form'>
        <div class='row'>
          <div class='col margin'>
            <span class='placeholder'>il tuo Username: </span>
            $username
          </div>
          <div class='col'>
            <span class='placeholder'>La tua Mail: </span>
            $email
          </div>
        </div>
        <div class='container'>
          <h2>Tieni traccia delle tue entrate e delle tue uscite!</h2>
        </div>
        <a href='https://claudiolarosa.altervista.org/home/' class='button bgprimary' data-saferedirecturl='https://claudiolarosa.altervista.org/home/'>Apri l'app</a>
      </div>
    </div>
  </body>
</html>
";

$headersP[] = 'MIME-Version: 1.0';
$headersP[] = 'Content-type: text/html; charset=utf-8';
$headersP[] = "To: $username <$email>";
$headersP[] = "From: Gestione Spese <claudiolarosa@altervista.org>";
mail($email, 'Email da Gestione Spese', $userMessage, implode("\r\n", $headersP));
?>
