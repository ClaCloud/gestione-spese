import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import { Text, } from '../components/inputs';
import $, { jQuery } from 'jquery';

function Register() {
  useEffect(() => {
  }, []);

  return (
    <div id="login">
      <div className="frame">
        <div className="container">
          <div className="logo">
            <img src="/assets/img/ico512.png" alt=""/>
          </div>
          <form action="" method="post" name="login">
            <Text id="username" nome="Username" />
            <label for="password">
              <input type="password" name="password" placeholder=" " maxlength="50" required />
              <span className="placeholder">Password</span>
            </label>
            <a href="/rec-pass.php" className="primary" style={{float: 'right'}}>Password dimenticata?</a>
            <div className="fixed bot">
              <div className="container">
                <div className="row no-wrap">
                  <div className="col-3-2">
                    <button name="submit" type="submit" className="button bgprimary">Login</button>
                  </div>
                  <div className="col-3">
                    <a href="/register" className="button">New</a>
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

export default Register;