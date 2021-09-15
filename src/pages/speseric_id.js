import React, { useState, useEffect } from 'react';
import { Soldi, Text, Data } from '../components/inputs';
import Box from '../components/box';
import BackBar from '../components/backbar';
import Modale from '../components/modale';
import $ from 'jquery';

function SpeseRic_id(props) {

  const id = props.match.params.id;

  useEffect(() => {
    fetchData();
  })

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [speseric, setSpeseric] = useState({
    "periodo": "1",
    "motivo": "motivo",
    "costo": 20,
    "rinnovo": "2021-07-29 11:13:41"
  });

  const fetchData = () => {
    Promise.all([
      fetch(`/API/speseric.php?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setSpeseric(data1);
        setitemsLoaded(true);
      })
  }

  const backText = speseric.periodo == 0 ? (<span><b>Mensile</b></span>) : (<span><b>Annuale</b></span>)

  function elimina() {
    $(".wrap-caricamento").addClass("visible");

    $.ajax({
      type: "POST",
      url: "/API/el-speseric.php",
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

    const periodo = $("#periodo").val(),
      motivo = $("#motivo").val(),
      costo = $("input[name=prezzo]").val(),
      rinnovo = $("#rinnovo").val();

    $.ajax({
      type: "POST",
      url: "/API/mod-speseric.php",
      data: {
        id: id,
        periodo: periodo,
        motivo: motivo,
        costo: costo,
        rinnovo: rinnovo,
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
      <Modale
        dataModale="elimina"
        className="full"
        content={
          <div>
            <div className="row">
              <div className="col">
                <h3>Elimina</h3>
                <p>Sei sicuro di voler eliminare questa Spesa {backText}?</p>
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

      <Modale
        dataModale="modifica"
        className="full"
        content={
          <form onSubmit={modifica}>

            <label htmlFor="periodo" className="col-2 select-wrap marbot">
              <select id="periodo" name="periodo">
                <option value="0" selected={speseric.periodo == 0 ? true : false} >Mensile</option>
                <option value="1" selected={speseric.periodo == 1 ? true : false} >Annuale</option>
              </select>
              <span className="placeholder">Periodo</span>
            </label>

            <Soldi data={speseric.costo} />
            <Text id="motivo" nome="Motivo" data={speseric.motivo} required={true} />

            <Data id="rinnovo" nome="rinnovo" data={speseric.rinnovo} required={true} />

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

      <BackBar text={"Spese Ricorrenti"} />

      <div className="container">

        <Box categoria={backText} />

        <Box motivo={speseric.motivo ?? "Motivo Random"} nonData="Rinnovo: " data={speseric.rinnovo} prezzo={speseric.costo} />

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

export default SpeseRic_id;