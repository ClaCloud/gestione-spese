import React, { useState, useEffect } from 'react';
import { Soldi, Text } from '../components/inputs';
import BackBar from '../components/backbar';
import Box from '../components/box';
import $, { jQuery } from 'jquery';

export default function Trasferimento() {

  const [metodi, setMetodi] = useState([
    {
      "id": "1",
      "metodo": "Portafoglio",
      "totale": "10090.70",
      "visibile": "1",
      "abilitato": "1"
    },
    {
      "id": "2",
      "metodo": "N26",
      "totale": "-1508.00",
      "visibile": "0",
      "abilitato": "1"
    },
    {
      "id": "3",
      "metodo": "Banco Posta",
      "totale": "4000.00",
      "visibile": "1",
      "abilitato": "1"
    },
    {
      "id": "4",
      "metodo": "Unicredit",
      "totale": "39.56",
      "visibile": "1",
      "abilitato": "1"
    }
  ]);
  const [SeleMet, setSeleMet] = useState({
    metodo1: 0,
    metodo2: 0,
    mettot1: $(`#metodo1 option[value=${0}]`).attr("tot"),
    mettot2: $(`#metodo2 option[value=${0}]`).attr("tot")
  });


  useEffect(() => {

    fetchMetodi();

    $('#root').on("click", ".swap", function () {
      var prezzo = $("input[name=prezzo]").val().replace(",", ".");
      var metodo1 = $("#metodo1").val();
      var metodo2 = $("#metodo2").val();

      $("#metodo1").val(metodo2);
      $("#metodo2").val(metodo1);

      setSeleMet({ metodo1: metodo2, metodo2: metodo1, mettot1: $(`#metodo2 option[value=${metodo2}]`).attr("tot") - prezzo, mettot2: $(`#metodo1 option[value=${metodo1}]`).attr("tot") - (-prezzo) });
    });

    $('#root').on("change", ".metodini", function () {

      var prezzo = $("input[name=prezzo]").val().replace(",", ".");
      var metodo1 = $("#metodo1").val();
      var metodo2 = $("#metodo2").val();

      setSeleMet({ metodo1: metodo1, metodo2: metodo2, mettot1: $(`#metodo1 option[value=${metodo1}]`).attr("tot") - prezzo, mettot2: $(`#metodo2 option[value=${metodo2}]`).attr("tot") - (- prezzo) });
    });

    $('#root').on("input", "input[name=prezzo]", function () {

      var prezzo = $("input[name=prezzo]").val().replace(",", ".");
      var metodo1 = $("#metodo1").val();
      var metodo2 = $("#metodo2").val();

      setSeleMet({ metodo1: metodo1, metodo2: metodo2, mettot1: $(`#metodo1 option[value=${metodo1}]`).attr("tot") - prezzo, mettot2: $(`#metodo2 option[value=${metodo2}]`).attr("tot") - (- prezzo) });
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

    const metodo1 = $("#metodo1").val(),
      prezzo = $("input[name=prezzo]").val(),
      metodo2 = $("#metodo2").val();

    if (metodo1 == 0 || metodo2 == 0) {
      alert("Seleziona entrambi i metodi di pagamento")
    } else {
      $.ajax({
        type: "POST",
        url: "/API/trasferimento.php",
        data: {
          metodo1: metodo1,
          metodo2: metodo2,
          prezzo: prezzo
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
  }

  return (
    <div id="trasferimento">
      <BackBar text={`Trasferimento`} />
      <div className="container">
        <form onSubmit={transfer}>
          <Soldi />
          <div class="row no-wrap">
            <label for="metodo1" class="col-2 select-wrap">
              <select id="metodo1" name="metodo1" class="metodini">
                <option value={0} >Seleziona un conto</option>
                {metodi.map(metodo => (
                  <option value={metodo.id} tot={metodo.totale} disabled={metodo.id == SeleMet.metodo2 ? true : false} >{metodo.metodo}</option>
                ))}
              </select>
              <span class="placeholder">Da</span>
            </label>
            <label for="metodo2" class="col-2 select-wrap">
              <select id="metodo2" name="metodo2" class="metodini">
                <option value={0} >Seleziona un conto</option>
                {metodi.map(metodo => (
                  <option value={metodo.id} tot={metodo.totale} disabled={metodo.id == SeleMet.metodo1 ? true : false} >{metodo.metodo}</option>
                ))}
              </select>
              <span class="placeholder">Verso</span>
            </label>
            <div class="swap">
              <i class="fas fa-sync-alt"></i>
            </div>
          </div>

          <div class="row no-wrap">
            <div className="col-2">
              <Box prezzo={SeleMet.metodo1 == 0 ? '' : SeleMet.mettot1} />
            </div>
            <div className="col-2">
              <Box prezzo={SeleMet.metodo2 == 0 ? '' : SeleMet.mettot2} />
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