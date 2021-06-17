import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import dateFormat from 'dateformat';
import BackBar from '../components/backbar';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import $, { jQuery } from 'jquery';

function Spazi(props) {

  const id = props.match.params.id;

  useEffect(() => {
    fetchData();
  }, []);

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [Spazio, setSpazio] = useState({ Nome: "Nome Spazio", Bilancio: "0.00" });
  const [movimenti, setMovimenti] = useState([]);

  const fetchData = () => {
    Promise.all([
      fetch(`/API/spazi.php?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
      fetch(`/API/transazioni.php?spazio=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setSpazio(data1);
        setMovimenti(data2);
        setitemsLoaded(true);
      });
  }

  const elimina = () => {
    $.ajax({
      type: "POST",
      url: "/API/removeSpazio.php",
      data: {
        id: id
      },
      success: function (response) {
        if (response == true) {
          window.location.replace("/spazi");
        } else {
          alert(response)
        }
      }
    });
  }

  function SayMese(props) {
    const label = props.label,
      did = props.render;
    if (did) {
      return (
        <h3 className="say-mese">
          {label}
        </h3>
      )
    } else {
      return null
    }
  }

  var oggi = Date(),
    qstmese = dateFormat(oggi, "mmmm"),
    qstanno = dateFormat(oggi, "yyyy"),
    mese = '',
    anno = '',
    premese = '',
    preanno = '',
    label = '',
    did = false,
    totale = 0;

  return (
    <div id="spazio" className={itemsLoaded ? (null) : ('preloading')}>
      <BackBar text={
        <Link to={`/spazio/${id}/setting`}>
          <i className="fas fa-cog"></i>
        </Link>
      } />
      <div className="top" style={{ background: Spazio.colore }} >
        <img src={Spazio.percorso} alt="" />
      </div>
      <div className="frame">
        <div className="container">
          <div className="info-spazio">
            <span className="nome">{Spazio.Nome}</span>
            <CurrencyFormat value={Spazio.Bilancio} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
              <span className="bilancio">
                € {value}
              </span>
            } />
          </div>
          {itemsLoaded ? (movimenti.length == 0 || movimenti.length == undefined ? (
            movimenti.length == 0 ? (
              <>
                <div className="box">
                  <h2 className="center">Ancora nessuna transazione</h2>
                </div>
                <button onClick={elimina} className="button mini bgalert marbot">Elimina Spazio Vuoto</button>
              </>

            ) : (
              <div className="box-temporale">
                <SayMese render={true} label={qstanno === dateFormat(movimenti.Data, "yyyy") ? (qstmese === dateFormat(movimenti.Data, "mmmm") ? "Questo mese" : dateFormat(movimenti.Data, "mmmm")) : dateFormat(movimenti.Data, "mmmm") + " " + dateFormat(movimenti.Data, "yyyy")} />
                <Box key={movimenti.id} motivo={movimenti.Motivo} data={movimenti.Data} prezzo={movimenti.Soldi} icona={movimenti.percorso} link={`/transazione/${movimenti.id}`} id={movimenti.id} />
              </div>
            )
          ) : (
            movimenti.map(movimento => {
              mese = dateFormat(movimento.Data, "mmmm");
              anno = dateFormat(movimento.Data, "yyyy");
              if (mese !== premese) {
                premese = mese;
                preanno = anno;
                did = true;
                label = qstanno === anno ? (qstmese === mese ? "Questo mese" : mese) : mese + " " + anno;
              } else {
                did = false;
              }
              return (
                <div className="box-temporale">
                  <SayMese render={did} label={label} />
                  <Box key={movimento.id} motivo={movimento.Motivo} data={movimento.Data} prezzo={movimento.Soldi} icona={movimento.percorso} link={`/transazione/${movimento.id}`} id={movimento.id} />
                </div>
              )
            })
          )) : (
            <div className="box-temporale">
              <SayMese render={true} label={`Settembre`} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Spazi;