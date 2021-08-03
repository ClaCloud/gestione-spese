import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import { Soldi, Data, Text, TextArea, Select, Option } from '../components/inputs';

export default function AddMetodo(props) {

  const addMet = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const metodo = $("#metodo").val(),
      valuta = $("input[name=prezzo]").val();

    $.ajax({
      type: "POST",
      url: "/API/addMetodo.php",
      data: {
        metodo: metodo,
        valuta: valuta
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          window.location.replace("/profilo");
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }

  return (
    <div id="new-metodi">
      <BackBar text="Nuovo Metodo" />
      <div className="container">
        <div className="logo">
          <img src="/assets/img/icons/icons8-credit-card-100.png" alt="" />
        </div>
        <h2>Nuovo Metodo di Pagamento</h2>
        <p>Aggiungi un nuovo metodo, basta inserire il nome e la valuta attuale</p>
        <form onSubmit={addMet}>
          <Soldi />
          <Text nome="Nome Metodo" id="metodo" />
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