import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function E404() {

  function goBack() {
    window.history.back();
  }

  return (
    <div className="modal" style={{height: "calc(100vh - 67px)"}}>
      <div className="container" style={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      alignItems: "center",
      position: "relative",
      top: "50%",
      transform: "translateY(-50%)"
      }}>
        <h1>Non sei autorizzato a stare qui</h1>
        <a onClick={goBack} className="button bgprimary">torna indietro</a>
      </div>
    </div>
  );
}

export default E404;
