import React, { useState, useEffect } from 'react';
import { Soldi, Text } from '../components/inputs';
import Box from '../components/box';
import BackBar from '../components/backbar';
import Modale from '../components/modale';
import $, { jQuery } from 'jquery';

function DebCred_id(props) {

  const id = props.match.params.id;

  useEffect(() => {
    fetchData();
  }, [])

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [debcred, setDebcred] = useState({
    "tipo": "1"
  });

  const fetchData = () => {
    Promise.all([
      fetch(`/API/debcred.php?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setDebcred(data1);
        setitemsLoaded(true);
      })
  }

  const backText = debcred.tipo == 0 ? (<span><b>Debito</b></span>) : (<span><b>Credito</b></span>)

  function elimina() {
    $(".wrap-caricamento").addClass("visible");

    $.ajax({
      type: "POST",
      url: "/API/el-debcred.php",
      data: {
        id: id
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          window.history.back();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }

  const modifica = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const tipo = $("#tipo").val(),
      persona = $("#persona").val(),
      valuta = $("input[name=prezzo]").val(),
      motivo = $("#motivo").val();

    $.ajax({
      type: "POST",
      url: "/API/mod-debcred.php",
      data: {
        id: id,
        tipo: tipo,
        persona: persona,
        valuta: valuta,
        motivo: motivo,
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          $(".modale[data-modal=modifica]").removeClass("open");
          fetchData();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }

  return (
    <div id="transazione" className={itemsLoaded ? (null) : ('preloading')}>
      {debcred.motivo ? (
        <Modale
          dataModale="modifica"
          content={
            <form onSubmit={modifica}>
              <div className="row">

                <label htmlFor="tipo" className="col-2 select-wrap marbot">
                  <select id="tipo" name="tipo">
                    <option value="0" selected={debcred.tipo == 0 ? true : false} >Debito</option>
                    <option value="1" selected={debcred.tipo == 1 ? true : false} >Credito</option>
                  </select>
                  <span className="placeholder">Tipo</span>
                </label>
                <Text id="persona" nome="Persona" data={debcred.persona} required={true} className="col-2" />
              </div>

              <Soldi data={debcred.valuta} />
              <Text id="motivo" nome="Motivo" data={debcred.motivo} required={true} />
              <div className="row no-wrap">
                <div className="col-3-2">
                  <button type="submit" className="button mini bgprimary">Aggiungi</button>
                </div>
                <div className="col-3">
                  <a className="button mini close-modal bgalert" data-modal="modifica">Annulla</a>
                </div>
              </div>
            </form>
          }
        />
      ) : null}

      <Modale
        dataModale="elimina"
        content={
          <div>
            <div className="row">
              <div className="col">
                <h3>Elimina</h3>
                <p>Sei sicuro di voler eliminare questo {backText}?</p>
              </div>
            </div>
            <div className="row no-wrap">
              <div className="col-2">
                <a className="button mini close-modal bgprimary" data-modal="elimina">No</a>
              </div>
              <div className="col-2">
                <a className="button mini bgalert" onClick={elimina} >Si</a>
              </div>
            </div>
          </div>
        }
      />

      <BackBar text={backText} />

      <div className="container">

        <Box categoria={debcred.persona ?? "Persona"} />

        <Box motivo={debcred.motivo ?? "Motivo Random"} data={debcred.data ?? "2021-05-27"} prezzo={debcred.valuta ?? "200"} />

        <div className="fixed bot">
          <div className="container">
            <div className="row no-wrap">
              <div className="col-3-2">
                <a className="button bgprimary mini open-modal marbot" data-modal="modifica">Modifica</a>
              </div>
              <div className="col-3">
                <a className="button bgalert mini open-modal marbot" data-modal="elimina">Elimina</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DebCred_id;