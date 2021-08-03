import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../components/inputs';
import $, { jQuery } from 'jquery';

function Login() {
  useEffect(() => {

  }, []);

  const verifyLogin = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const username = $("input[name=username]").val(),
      password = $("input[name=password]").val();

    $.ajax({
      type: "POST",
      url: "/API/login.php",
      data: { username: username, password: password },
      success: function (response) {
        if (response) {
          $(".wrap-caricamento").removeClass("visible");
          window.location.replace("/home");
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert("Username o Password sbagliata")
        }
      }
    });
  }

  return (
    <div id="login">
      <div className="frame">
        <div className="container">
          <div className="logo">
            <img src="/assets/img/ico512.png" alt="" />
          </div>
          <form onSubmit={verifyLogin}>
            <Text id="username" nome="Username" required />
            <label htmlFor="password">
              <input type="password" name="password" placeholder=" " maxLength="50" required />
              <span className="placeholder">Password</span>
            </label>
            <a href="/rec-pass.php" className="primary" style={{ float: 'right' }}>Password dimenticata?</a>
            <div className="fixed bot">
              <div className="container">
                <div className="row no-wrap">
                  <div className="col-3-2">
                    <button name="submit" type="submit" className="button bgprimary mini marbot">Login</button>
                  </div>
                  <div className="col-3">
                    <a href="/register" className="button mini marbot">Registrati</a>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;