import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from '../components/box';
import BackBar from '../components/backbar';
import Modale from '../components/modale';
import AddComponent from '../components/add';
import $, { jQuery } from 'jquery';

function Transazione(props) {

  const id = props.match.params.id;

  useEffect(() => {
    fetchData();
  }, [])

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [movimento, setMovimento] = useState({});
  const [spazio, setSpazio] = useState({});

  const fetchData = () => {
    Promise.all([
      fetch(`/API/transazioni.php?transazione=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setMovimento(data1);
        setitemsLoaded(true);
        Promise.all([
          fetch(`/API/spazi.php?id=${data1.IDSpazio}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
        ])
          .then(([res2]) => Promise.all([res2.json()]))
          .then(([data2]) => {
            setSpazio(data2);
          })
      })
  }

  const backText = movimento.Soldi > 0 ? (<span>Versato in <b>{movimento.Metodo}</b></span>) : (<span>Pagato con <b>{movimento.Metodo}</b></span>)

  const ES = movimento.Soldi > 0 ? "entrata" : "spesa",
    Soldi = movimento.Soldi ?? '20.00',
    Appunti = movimento.Appunti ?? null,
    Motivo = movimento.Motivo ?? null,
    Metodo = movimento.Metodo ?? null,
    Categoria = movimento.Categoria ?? null,
    Spazio = spazio.Nome ?? null,
    ripeti = "/add-" + ES + "/" + Categoria + "/" + Soldi + "/" + Metodo + "/" + Motivo + "/" + Spazio + "/" + Appunti;

  function elimina() {
    $(".wrap-caricamento").addClass("visible");

    $.ajax({
      type: "POST",
      url: "/API/eliminaTransa.php",
      data: {
        id: id,
        prezzo: Soldi,
        idmetodo: movimento.IDMetodo,
        idspazio: movimento.IDSpazio
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

    const categoria = $("#categoria").val(),
      prezzo = $("input[name=prezzo]").val(),
      data = $("input[name=data]").val(),
      metodo = $("#metodo").val(),
      motivo = $("input[name=motivo]").val(),
      idspazio = $("#spazio").val(),
      appunti = $("textarea[name=appunti]").val();

    $.ajax({
      type: "POST",
      url: "/API/modifica.php",
      data: {
        categoria: categoria,
        prezzo: prezzo,
        data: data,
        metodo: metodo,
        motivo: motivo,
        spazio: idspazio,
        appunti: appunti,
        id: id,
        soldi: Soldi,
        idmetodo: movimento.IDMetodo,
        totale: movimento.totale,
        idspazio: movimento.IDSpazio,
        bilancio: spazio.Bilancio
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
        content={
          <div>
            <div className="row">
              <div className="col">
                <h3>Elimina</h3>
                <p>Sei sicuro di voler eliminare questa transazione?</p>
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
        content={
          <form onSubmit={modifica}>
            <div className="row">
              <div className="col">
                <AddComponent soldi={movimento.Soldi} data={movimento.Data} motivo={movimento.Motivo} appunti={movimento.Appunti} selectedMetodo={movimento.Metodo} selectedCategoria={movimento.Categoria} selectedSpazio={spazio.Nome} />
              </div>
            </div>
            <div className="row no-wrap">
              <div className="col-3-2">
                <button type="submit" className="button mini bgprimary">Modifica</button>
              </div>
              <div className="col-3">
                <a className="button mini close-modal bgalert" data-modal="modifica">Annulla</a>
              </div>
            </div>
          </form>
        }
      />

      <BackBar text={backText} />

      <div className="top" style={{ background: movimento.colore }}>
        <div className="ico" style={{ background: movimento.colore }}>
          <img src={movimento.percorso} />
        </div>
      </div>
      <div className="container">

        <Box categoria={movimento.Categoria ?? "Categoria"} />

        <Box motivo={movimento.Motivo ?? "Motivo Random"} data={movimento.Data ?? "2021-05-27"} prezzo={movimento.Soldi ?? "200"} />

        {spazio.Nome ? (
          <Box icona={spazio.percorso} colore={spazio.colore} motivo={spazio.Nome} />
        ) : (null)}

        {movimento.Appunti != "" ? (
          <Box appunti={movimento.Appunti ?? "Lorem ipsum dolor sit amet consectetur adipiscing elit"} />
        ) : (null)}

        <Link to={ripeti} className="button bgsecondary mini">Ripeti transazione</Link>
        <div className="row no-wrap">
          <div className="col-3-2">
            <a className="button bgprimary mini open-modal" data-modal="modifica">Modifica</a>
          </div>
          <div className="col-3">
            <a className="button bgalert mini open-modal" data-modal="elimina">Elimina</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Transazione;