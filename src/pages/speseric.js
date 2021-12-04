import React, { useState, useEffect } from "react";
import { Soldi, Text, Data } from "../components/inputs";
import Box from "../components/box";
import CurrencyFormat from "react-currency-format";
import BackBar from "../components/backbar";
import Modale from "../components/modale";
import $, { jQuery } from "jquery";

function SpeseRic() {
  useEffect(() => {
    fetchData();
  }, []);

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [speseric, setSpeseric] = useState({
    Annuali: {
      hidden: true,
    },
    Mensili: {
      hidden: false,
      dati: [
        {
          id: "4",
          motivo: "Netflix",
          costo: "3.20",
          rinnovo: "2021-05-30 00:00:00",
        },
        {
          id: "5",
          motivo: "sesso",
          costo: "6.00",
          rinnovo: "2021-05-04 00:00:00",
        },
      ],
      totale: 9.2,
    },
  });

  const fetchData = () => {
    Promise.all([
      fetch(`/API/speseric.php`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setSpeseric(data1);
        setitemsLoaded(true);
      });
  };

  const aggiungi = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const periodo = $("#periodo").val(),
      motivo = $("#motivo").val(),
      costo = $("input[name=prezzo]").val(),
      rinnovo = $("#rinnovo").val();

    $.ajax({
      type: "POST",
      url: "/API/new-speseric.php",
      data: {
        periodo: periodo,
        motivo: motivo,
        costo: costo,
        rinnovo: rinnovo,
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          $(".modale[data-modal=aggiungi]").removeClass("open");
          fetchData();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response);
        }
      },
    });
  };

  return (
    <div id="speseric" className={itemsLoaded ? null : "preloading"}>
      <Modale
        dataModale="aggiungi"
        className="full"
        content={
          <form onSubmit={aggiungi}>
            <label htmlFor="periodo" className="col-2 select-wrap marbot">
              <select id="periodo" name="periodo">
                <option value="0">Mensile</option>
                <option value="1">Annuale</option>
              </select>
              <span className="placeholder">Periodo</span>
            </label>

            <Soldi />
            <Text id="motivo" nome="Motivo" required={true} />
            <Data id="rinnovo" nome="rinnovo" required={true} />

            <div className="row no-wrap">
              <div className="col-3-2">
                <button type="submit" className="button mini bgprimary">
                  Aggiungi
                </button>
              </div>
              <div className="col-3">
                <a
                  className="button mini close-modal bgalert"
                  data-modal="aggiungi"
                >
                  Annulla
                </a>
              </div>
            </div>
          </form>
        }
      />

      <BackBar text={"Spese Ricorrenti"} />

      <div className="modal">
        <div className="fixed bot">
          <div className="container">
            <div
              className="open-modal button mini marboth"
              data-modal="aggiungi"
            >
              Aggiungi
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {speseric.Mensili.hidden === false ? (
              <div className="col-2">
                <div className="top">
                  <div className="container">
                    <div className="totale">
                      <CurrencyFormat
                        value={speseric.Mensili.totale}
                        isNumericString={true}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={(value) => (
                          <div className={`totale daBlur`}>€ {value}</div>
                        )}
                      />
                      <span>
                        Mensili
                        <CurrencyFormat
                          value={speseric.Mensili.totale * 12}
                          isNumericString={true}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={(value) => (
                            <>
                              {" "}
                              • € <span className="daBlur">{value}</span>{" "}
                              all'Anno
                            </>
                          )}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {speseric.Mensili.dati.map((spesa) => (
                  <Box
                    link={`/profilo/speseric/${spesa.id}`}
                    motivo={spesa.motivo}
                    nonData="Rinnovo: "
                    data={spesa.rinnovo}
                    prezzo={spesa.costo}
                  />
                ))}
              </div>
            ) : null}
            {speseric.Annuali.hidden === false ? (
              <div className="col-2">
                <div className="top">
                  <div className="container">
                    <div className="totale">
                      <CurrencyFormat
                        value={speseric.Annuali.totale}
                        isNumericString={true}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        renderText={(value) => (
                          <div className={`totale daBlur`}>€ {value}</div>
                        )}
                      />
                      <span>
                        Annuali
                        <CurrencyFormat
                          value={speseric.Annuali.totale / 12}
                          isNumericString={true}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={(value) => (
                            <>
                              {" "}
                              • € <span className="daBlur">{value}</span> al
                              Mese
                            </>
                          )}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {speseric.Annuali.dati.map((spesa) => (
                  <Box
                    link={`/profilo/speseric/${spesa.id}`}
                    motivo={spesa.motivo}
                    nonData="Rinnovo: "
                    data={spesa.rinnovo}
                    prezzo={spesa.costo}
                  />
                ))}
              </div>
            ) : null}
            {speseric.Mensili.hidden === true ? (
              speseric.Annuali.hidden === true ? (
                <div className="col">
                  <div
                    className="box"
                    style={{
                      display: "block",
                      maxWidth: "600px",
                      margin: "20px auto",
                    }}
                  >
                    <div className="icona center" style={{ fontSize: "50px" }}>
                      <i className="fas fa-business-time"></i>
                    </div>
                    <div className="testo center">
                      Aggiungi le spese riccorrenti che esegui, ad esempio gli
                      abbonamenti di Netflix e Spotify
                    </div>
                  </div>
                </div>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeseRic;
