import React, { useState, useEffect } from 'react';
import { Soldi, Text } from '../components/inputs';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';

export default function Trasferimento(props) {

  const [metodi, setMetodi] = useState([
    {
      "id": "1",
      "metodo": "Portafogli",
      "totale": "20.00",
      "visibile": "1"
    },
    {
      "id": "2",
      "metodo": "N26",
      "totale": "50.00",
      "visibile": "1"
    },
  ]);

  useEffect(() => {

    fetchMetodi();

    $('#root').on("click", ".imp.open-modal", function () {
      var id = $(this).attr("data-id");
      var metodo = $(this).attr("data-metodo");
      var totale = $(this).attr("data-totale");
      //setmodalMetodo({ id: id, metodo: metodo, totale: totale });
    });
  }, [])

  const fetchMetodi = () => {
    fetch('/API/metodi.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMetodi(myJson);
      });
  }

  const transfer = (event) => {
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
    <div id="trasferimento">
      <BackBar text={`Trasferimento`} />
      <div className="container">
        <form onSubmit={transfer}>
          <Soldi />
          <div class="row no-wrap">
            <label for="metodo1" class="col-2 select-wrap">
              <select id="metodo1" name="metodo1" class="metodini" onchange="changeVAL(this)">
                {metodi.map(metodo => (
                  <option value={metodo.id} tot={metodo.totale}>{metodo.metodo}</option>
                ))}
              </select>
              <span class="placeholder">Da</span>
            </label>
            <label for="metodo2" class="col-2 select-wrap">
              <select id="metodo2" name="metodo2" class="metodini" onchange="changeVAL(this)">
                {metodi.map(metodo => (
                  <option value={metodo.id} tot={metodo.totale}>{metodo.metodo}</option>
                ))}
              </select>
              <span class="placeholder">Verso</span>
            </label>
            <div class="swap">
              <i class="fas fa-sync-alt"></i>
            </div>
          </div>
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