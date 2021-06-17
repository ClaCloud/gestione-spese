import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import AddSpazioComponent from '../components/addSpazio';

export default function Add() {

  const addSpazio = (event) => {
    event.preventDefault();
    if ($('input[type="radio"]').is(':checked')) {
      const icona = $("input[type=radio]:checked").val(),
        nome = $("input[name=spazio]").val();

      $.ajax({
        type: "POST",
        url: "/API/addSpazio.php",
        data: {
          icona: icona,
          nome: nome
        },
        success: function (response) {
          if (response == true) {
            window.location.replace("/spazi");
          } else {
            alert(response)
          }
        }
      });
    } else {
      $(".error").addClass("visible");
    }
  }

  return (
    <div id="new-spazio">
      <BackBar text={`Nuovo Spazio`} />
      <div className="container">
        <form onSubmit={addSpazio}>
          <AddSpazioComponent/>
          <div className="fixed bot">
            <div className="container">
              <button type="submit" className="button mini bgprimary marbot">Conferma</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}