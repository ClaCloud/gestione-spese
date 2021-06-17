import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import AddComponent from '../components/add';

export default function Add (props) {

  const addTransa = (event) => {
    event.preventDefault();

    const categoria = $("#categoria").val(),
      prezzo = $("input[name=prezzo]").val(),
      data = $("input[name=data]").val(),
      metodo = $("#metodo").val(),
      motivo = $("input[name=motivo]").val(),
      spazio = $("#spazio").val(),
      appunti = $("textarea[name=appunti]").val();

    $.ajax({
      type: "POST",
      url: "/API/add.php",
      data: {
        tipo: tipo,
        categoria: categoria,
        prezzo: prezzo,
        data: data,
        metodo: metodo,
        motivo: motivo,
        spazio: spazio,
        appunti: appunti
      },
      success: function (response) {
        if (response == true) {
          window.location.replace("/home");
        } else {
          alert(response)
        }
      }
    });
  }

  const tipo = props.match.params.tipo,
    soldi = props.match.params.Soldi,
    appunti = props.match.params.Appunti,
    motivo = props.match.params.Motivo,
    metodo = props.match.params.Metodo,
    categoria = props.match.params.Categoria,
    spazio = props.match.params.Spazio;

  return (
    <div id="add" className={tipo}>
      <BackBar text={`Nuova ${tipo}`} />
      <div className="container">
        <form onSubmit={addTransa}>
          <AddComponent soldi={soldi} appunti={appunti} motivo={motivo} selectedMetodo={metodo} selectedCategoria={categoria} selectedSpazio={spazio} />
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