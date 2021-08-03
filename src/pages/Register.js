import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import { Text, } from '../components/inputs';
import $, { jQuery } from 'jquery';

function Register() {
  useEffect(() => {
  }, []);

  const [pannello, setPannello] = useState(0);

  const registrazione = (event) => {
    event.preventDefault();
    const username = $("input[name=username]").val(),
      password = $("input[name=password]").val(),
      REpassword = $("input[name=REpassword]").val(),
      email = $("input[name=email]").val();
    if (password === REpassword) {
      $(".wrap-caricamento").addClass("visible");
      $.ajax({
        type: "POST",
        url: "/API/register.php",
        data: { username: username, email: email, password: password },
        success: function (response) {
          if (response) {
            setPannello(1);
            $(".wrap-caricamento").removeClass("visible");
          } else {
            setPannello(2);
            $(".wrap-caricamento").removeClass("visible");
          }
        }
      });
    } else {
      $(".error").addClass("visible");
    }
  }

  return (
    <div id="register">
      <div className="frame">
        <div className="container">
          <div className="pannello" hidden={pannello === 0 ? false : true}>
            <div className="logo">
              <img src="/assets/img/ico512.png" alt="" />
            </div>
            <form onSubmit={registrazione}>
              <label htmlFor="username">
                <input type="text" id="username" name="username" placeholder=" " maxLength="50" required />
                <span className="placeholder">Username</span>
              </label>
              <label htmlFor="email">
                <input type="email" name="email" placeholder=" " maxLength="50" required />
                <span className="placeholder">Email</span>
              </label>
              <label htmlFor="password">
                <input type="password" name="password" id="password" placeholder=" " maxLength="255" required />
                <span className="placeholder">Password</span>
              </label>
              <label htmlFor="REpassword">
                <input type="password" name="REpassword" id="REpassword" placeholder=" " maxLength="255" required />
                <span className="placeholder">Conferma password</span>
              </label>
              <div className="fixed bot">
                <div className="error">
                  Le password non corrispondo
                </div>
                <div className="container">
                  <div className="row no-wrap">
                    <div className="col-3-2">
                      <button name="submit" type="submit" className="button bgprimary mini marbot">Registrati</button>
                    </div>
                    <div className="col-3">
                      <a href="/login" className="button mini marbot">Login</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="pannello" hidden={pannello === 1 ? false : true}>
            <div class="container">
              <div class="logo">
                <img src="/assets/img/icons/icons8-checked-200.png" alt="" />
              </div>
              <h2>Tutto fatto!</h2>
              <p class="center">Ora sei pronto ad entrare nella tua area personale ed iniziare a risparmiare</p>
              <div class="fixed bot">
                <div class="container">
                  <a href="/home" class="button bgprimary">Continua</a>
                </div>
              </div>
            </div>
          </div>
          <div className="pannello" hidden={pannello === 2 ? false : true}>
            <div className="container">
              <div className="logo">
                <img src="/assets/img/error.png" alt="" />
              </div>
              <p className="center">Lo username <b>{$("input[name=username]").val()}</b> è già in uso, se non sei tu prova con un altro username, altrimenti fai il login</p>
              <div className="fixed bot">
                <div className="container">
                  <div className="row no-wrap">
                    <div className="col-3-2">
                      <a href="/register" className="button bgprimary">Riprova</a>
                    </div>
                    <div className="col-3">
                      <a href="/login" className="button">Login</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;