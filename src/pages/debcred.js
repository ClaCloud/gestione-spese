import React, { useState, useEffect } from 'react';
import { Soldi, Text } from '../components/inputs';
import Box from '../components/box';
import CurrencyFormat from 'react-currency-format';
import BackBar from '../components/backbar';
import Modale from '../components/modale';
import $, { jQuery } from 'jquery';

function DebCred() {

  useEffect(() => {
    fetchData();
  }, [])

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [debcred, setDebcred] = useState({
    debiti: {
      hidden: false,
      "dati": [
        {
          "id": "1",
          "tipo": "0",
          "persona": "Marco Parrinello",
          "motivo": "entrata random",
          "valuta": "17.50",
          "data": "2021-01-22 15:09:04"
        },
        {
          "id": "3",
          "tipo": "0",
          "persona": "Culo",
          "motivo": "debitino",
          "valuta": "10.00",
          "data": "2021-07-29 08:33:51"
        },
        {
          "id": "4",
          "tipo": "0",
          "persona": "Daniele Valori",
          "motivo": "una cosa a caso",
          "valuta": "17.50",
          "data": "2021-07-29 08:34:03"
        }
      ],
      "totale": 45
    }, crediti: {
      "hidden": true
    }
  });

  const fetchData = () => {
    Promise.all([
      fetch(`/API/debcred.php`, {
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


  const aggiungi = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const tipo = $("#tipo").val(),
      persona = $("#persona").val(),
      valuta = $("input[name=prezzo]").val(),
      motivo = $("#motivo").val();

    $.ajax({
      type: "POST",
      url: "/API/new-debcred.php",
      data: {
        tipo: tipo,
        persona: persona,
        valuta: valuta,
        motivo: motivo,
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          $(".modale[data-modal=aggiungi]").removeClass("open");
          fetchData();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }

  return (
    <div id="debcred" className={itemsLoaded ? (null) : ('preloading')}>

      <Modale
        dataModale="aggiungi"
        content={
          <form onSubmit={aggiungi}>
            <div className="row">

              <label htmlFor="tipo" className="col-2 select-wrap marbot">
                <select id="tipo" name="tipo">
                  <option value="0">Debito</option>
                  <option value="1">Credito</option>
                </select>
                <span className="placeholder">Tipo</span>
              </label>
              <Text id="persona" nome="Persona" required={true} className="col-2" />
            </div>
            
            <Soldi />
            <Text id="motivo" nome="Motivo" required={true} />
            <div className="row no-wrap">
              <div className="col-3-2">
                <button type="submit" className="button mini bgprimary">Aggiungi</button>
              </div>
              <div className="col-3">
                <a className="button mini close-modal bgalert" data-modal="aggiungi">Annulla</a>
              </div>
            </div>
          </form>
        }
      />

      <BackBar text={'Debiti e Crediti'} />

      <div className="modal">
        <div className="container">
          <div className="open-modal button mini marboth" data-modal="aggiungi" >Aggiungi</div>
          <div className="row">
            {debcred.debiti.hidden === false ? (
              <div className="col-2">
                <div className="top">
                  <div className="container">
                    <div className="totale">
                      <CurrencyFormat value={debcred.debiti.totale} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                        <div className={`totale`}>
                          € {value}
                        </div>
                      } />
                      <span>Totale Debiti</span>
                    </div>
                  </div>
                </div>
                {debcred.debiti.dati.map(debito => (
                  <Box link={`/profilo/debcred/${debito.id}`} className="debito" motivo={debito.motivo} nonData={debito.persona} prezzo={debito.valuta} />
                ))}
              </div>
            ) : null}
            {debcred.crediti.hidden === false ? (
              <div className="col-2">
                <div className="top">
                  <div className="container">
                    <div className="totale">
                      <CurrencyFormat value={debcred.crediti.totale} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                        <div className={`totale`}>
                          € {value}
                        </div>
                      } />
                      <span>Totale Crediti</span>
                    </div>
                  </div>
                </div>
                {debcred.crediti.dati.map(credito => (
                  <Box link={`/profilo/debcred/${credito.id}`} className="credito" motivo={credito.motivo} nonData={credito.persona} prezzo={credito.valuta} />
                ))}
              </div>
            ) : null}
            {debcred.debiti.hidden === true ? (
              debcred.crediti.hidden === true ? (
                <div className="col">
                <div className="box" style={{ display: "block", maxWidth: "600px", margin: "20px auto" }}>
                  <div className="icona center" style={{ fontSize: "50px" }}>
                    <i className="fas fa-business-time"></i>
                  </div>
                  <div className="testo center">
                    Aggiungi i debiti o credi che hai verso gli altri, così da non dimenticare nulla
                  </div>
                </div>
              </div>
              ): null
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebCred;