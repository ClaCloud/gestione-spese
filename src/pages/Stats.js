import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import Modale from '../components/modale';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, {
  Navigation, History
} from 'swiper/core';


import CurrencyFormat from 'react-currency-format';
import $, { jQuery } from 'jquery';

SwiperCore.use([Navigation, History]);

function Stats() {

  $(".App").removeClass("statsAnno");

  useEffect(() => {
    fetchData();
  }, []);

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [viewCat, setViewCat] = useState({
    "risultati": [
      {
        "Motivo": "7 Transazioni",
        "Soldi": -21,
        "percorso": "\/assets\/img\/search.png"
      }
    ],
    "agosto 2020": [
      {
        "id": "155",
        "Motivo": "Pulcinella 2.0",
        "Data": "2020-08-15",
        "Soldi": "-3.00",
        "IDSpazio": null,
        "IDMetodo": "1",
        "Appunti": "pizza margherita fal\u00f2",
        "percorso": "\/assets\/img\/icons\/alcol.png",
        "colore": "#cee1f4",
        "Categoria": "Bar & Ristoranti",
        "Metodo": "Portafoglio",
        "totale": "10101.80"
      }
    ]
  });
  const [statistiche, setStatistiche] = useState({
    mesi: [
      {
        "esiste": true,
        "mese": "giugno",
        "anno": "2021",
        "entrate": "25.00",
        "uscite": "-26.38",
        "bilancio": "-1.38"
      },
      {
        "mese": "maggio",
        "anno": "2021",
        "entrate": "50.05",
        "uscite": "-76.09",
        "bilancio": "-26.04",
        "esiste": true
      },
      {
        "mese": "novembre",
        "anno": "2020",
        "entrate": "0",
        "uscite": "-11.00",
        "bilancio": "-11",
        "esiste": true
      },
    ], inner: {
      novembre2020: [
        {
          "id": "4",
          "Categoria": "Casa & Utenze",
          "percorso": "/assets/img/icons/casa.png",
          "totale": "12.00",
          "dataInizio": "2021-06-01",
          "dataFine": "2021-06-30"
        }
      ],
      maggio2021: [
        {
          "id": "22",
          "Categoria": "Alcol",
          "percorso": "/assets/img/icons/alcol.png",
          "totale": "-2.28",
          "dataInizio": "2021-05-01",
          "dataFine": "2021-05-31"
        }
      ],
      giugno2021: [
        {
          "id": "3",
          "Categoria": "Bar & Ristoranti",
          "percorso": "/assets/img/icons/alcol.png",
          "totale": "-6.10",
          "dataInizio": "2020-11-01",
          "dataFine": "2020-11-30"
        },
        {
          "id": "5",
          "Categoria": "Cibo & Spesa",
          "percorso": "/assets/img/icons/spesa.png",
          "totale": "-2.28",
          "dataInizio": "2020-11-01",
          "dataFine": "2020-11-30"
        },
        {
          "id": "11",
          "Categoria": "Sottoscrizioni",
          "percorso": "/assets/img/icons/sottoscrizione.png",
          "totale": "-5.00",
          "dataInizio": "2020-11-01",
          "dataFine": "2020-11-30"
        },
        {
          "id": "16",
          "Categoria": "Cura Personale",
          "percorso": "/assets/img/icons/cura.png",
          "totale": "-13.00",
          "dataInizio": "2020-11-01",
          "dataFine": "2020-11-30"
        },
        {
          "id": "20",
          "Categoria": "Entrata",
          "percorso": "/assets/img/icons/entrata.png",
          "totale": "25.00",
          "dataInizio": "2020-11-01",
          "dataFine": "2020-11-30"
        }
      ],
    }
  });

  const fetchData = () => {
    fetch('/API/stats-mese.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setStatistiche(myJson);
        setitemsLoaded(true);
      });
  }

  const ViewCat = (idCategoria, data) => {
    $.ajax({
      type: "POST",
      url: "/API/transazioni.php",
      data: {
        cerca: true,
        categoria: idCategoria,
        mese: data
      },
      success: function (response) {
        setViewCat(response);
        $(".modale[data-modal=viewCat]").addClass("open");
      }
    });
  }

  return (
    <div id="stats" className={itemsLoaded ? (null) : ('preloading')}>
      <Modale
        dataModale="viewCat"
        className="full"
        content={
          <>
            {Object.keys(viewCat).map((key, i) => (
              key != "risultati" ? (
                viewCat[key].map(view => (
                  <Box key={view.id} motivo={view.Motivo} data={view.Data} prezzo={view.Soldi} icona={view.percorso} link={`/transazione/${view.id}`} />
                ))
              ) : (null)
            ))}
            <a className="button mini close-modal bgalert" data-modal="viewCat">Chiudi</a>
          </>
        }
      />
      <Swiper dir="rtl" autoHeight={true} slidesPerView={'auto'} centeredSlides={true} spaceBetween={50} history={{
        "key": ""
      }} className="stat-mese">
        {statistiche.mesi.map(mese => {
          var curr = mese.mese + mese.anno;
          if (mese.esiste) {
            return (
              <SwiperSlide data-history={`stats-mese-${curr}`} key={curr}>
                <div className="mese-S">
                  <div className="top">
                    <div className="container">
                      <h2 className="mese">
                        <span className="anno">
                          {mese.anno}
                        </span>
                        {mese.mese}
                      </h2>
                      <div className="chart">

                      </div>
                      <div className="row">
                        <div className="totale col-3 center">
                          <CurrencyFormat value={mese.entrate} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`totale ${mese.entrate > 0 ? ('green') : (mese.entrate < 0 ? 'alert' : null)}`}>
                              € {value}
                            </div>
                          } />
                          <span>Entrate</span>
                        </div>
                        <div className="totale col-3 center">
                          <CurrencyFormat value={mese.uscite} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`totale ${mese.uscite > 0 ? ('green') : (mese.uscite < 0 ? 'alert' : null)}`}>
                              € {value}
                            </div>
                          } />
                          <span>Uscite</span>
                        </div>
                        <div className="totale col-3 center">
                          <CurrencyFormat value={mese.bilancio} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`totale ${mese.bilancio > 0 ? ('green') : (mese.bilancio < 0 ? 'alert' : null)}`}>
                              € {value}
                            </div>
                          } />
                          <span>Bilancio</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal">
                    <div className="container">
                      {statistiche.inner[curr].map(categoria => (
                        // <div className="box viewCat" key={curr + "_" + categoria.id} onClick={() => ViewCat(categoria.id, categoria.dataInizio)}>
                        //   <div className="icona">
                        //     <img src={categoria.percorso} alt="" width="100%" />
                        //   </div>
                        //   <div className="dati">
                        //     <div className="motivo">{categoria.Categoria}</div>
                        //   </div>
                        //   <CurrencyFormat value={categoria.totale} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                        //     <div className={`prezzo ${categoria.totale > 0 ? ('green') : (categoria.totale < 0 ? 'alert' : null)}`}>
                        //       € {value}
                        //     </div>
                        //   } />
                        // </div>
                        <div onClick={() => ViewCat(categoria.id, categoria.dataInizio)}>
                          <Box key={curr + "_" + categoria.id} motivo={categoria.Categoria} data={categoria.Data} prezzo={categoria.totale} icona={categoria.percorso} />
                        </div>
                      ))}

                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          } else {
            return (
              <SwiperSlide data-history={`stats-mese-${curr}`} key={curr}>
                <div className="mese-S">
                  <div className="top">
                    <div className="container">
                      <h2 className="mese">
                        <span className="anno">
                          {mese.anno}
                        </span>
                        {mese.mese}
                      </h2>
                    </div>
                  </div>
                  <div className="modal">
                    <div className="container">
                      <div class="box">
                        <div class="dati center">
                          Nessuna transazione presente per questo mese
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          }
        })}
      </Swiper>
    </div>
  );
}

export default Stats;