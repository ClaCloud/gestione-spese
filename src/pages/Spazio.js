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
  const [Spazio, setSpazio] = useState({
    "id": "2",
    "position": "0",
    "Nome": "Crociera Lipari-Vulcano Agosto 2020",
    "Abilitato": "1",
    "Bilancio": "0.00",
    "IDicona": "17",
    "percorso": "/assets/img/icons/mappamondo.png",
    "colore": "#fce0a2"
  });
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

  return (
    <div id="spazio" className={itemsLoaded ? null : "preloading"}>
      <BackBar
        text={
          <Link to={`/spazio/${id}/setting`}>
            <i className="fas fa-cog"></i>
          </Link>
        }
      />
      <div className="top" style={{ background: Spazio.colore }}>
        <img src={Spazio.percorso} alt="" />
      </div>
      <div className="frame">
        <div className="container">
          <div className="info-spazio">
            <span className="nome">{Spazio.Nome}</span>
            <CurrencyFormat
              value={Spazio.Bilancio}
              isNumericString={true}
              displayType={"text"}
              thousandSeparator={"."}
              decimalSeparator={","}
              decimalScale={2}
              fixedDecimalScale={true}
              renderText={(value) => (
                <span className="bilancio daBlur">€ {value}</span>
              )}
            />
          </div>
          {itemsLoaded ? (
            movimenti.length == 0 || movimenti.length == undefined ? (
              movimenti.length == 0 ? (
                <>
                  <div className="box">
                    <h2 className="center">Ancora nessuna transazione</h2>
                  </div>
                  <button
                    onClick={elimina}
                    className="button mini bgalert marbot"
                  >
                    Elimina Spazio Vuoto
                  </button>
                </>
              ) : (
                Object.keys(movimenti).map((key, i) => (
                  <div className="box-temporale">
                    <SayMese render={true} label={key} />
                    {movimenti[key].map((movimento) => (
                      <Box
                        key={movimento.id}
                        motivo={movimento.Motivo}
                        data={movimento.Data}
                        prezzo={movimento.Soldi}
                        icona={movimento.percorso}
                        link={`/transazione/${movimento.id}`}
                        id={movimento.id}
                        appuntiFilter={movimento.Appunti}
                      />
                    ))}
                  </div>
                ))
              )
            ) : null
          ) : (
            <div className="box-temporale">
              <SayMese render={true} label={`Settembre`} />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
              <Box
                motivo={`Motivo Random`}
                data={`2021-05-27`}
                prezzo={`200`}
                icona={``}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Spazi;