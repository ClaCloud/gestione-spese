import React, { useState, useEffect } from 'react';
import Box from '../components/box';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, {
  Navigation, History
} from 'swiper/core';

// import { ResponsivePie } from '@nivo/pie'

import CurrencyFormat from 'react-currency-format';
import $, { jQuery } from 'jquery';

SwiperCore.use([Navigation, History]);

function Stats() {

  useEffect(() => {
    fetchData();
  }, [])

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [statistiche, setStatistiche] = useState({ mesi: [
    {
      "esiste": true,
      "mese": "giugno",
      "anno": "2021",
      "entrate": "25.00",
      "uscite": "-26.38",
      "bilancio": "-1,38"
    },
    {
      "mese": "maggio",
      "anno": "2021",
      "entrate": "50.05",
      "uscite": "-76.09",
      "bilancio": "-26,04",
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
  } });

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

//   const MyResponsivePie = ({ data /* see data tab */ }) => (
//     <ResponsivePie
//         data={data}
//         margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//         startAngle={-41}
//         innerRadius={0.5}
//         activeInnerRadiusOffset={5}
//         activeOuterRadiusOffset={5}
//         colors={{ scheme: 'category10' }}
//         borderColor={{ from: 'color', modifiers: [ [ 'darker', '0' ] ] }}
//         enableArcLinkLabels={false}
//         arcLinkLabelsSkipAngle={10}
//         arcLinkLabelsTextColor="#333333"
//         arcLinkLabelsThickness={2}
//         arcLinkLabelsColor={{ from: 'color' }}
//         arcLabel="id"
//         arcLabelsSkipAngle={10}
//         arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'brighter', '3' ] ] }}
//         motionConfig="stiff"
//         transitionMode="endAngle"
//         legends={[]}
//     />
// )

  return (
    <div id="stats" className={itemsLoaded ? (null) : ('preloading')}>
      <Swiper dir="rtl" autoHeight={true} slidesPerView={'auto'} centeredSlides={true} spaceBetween={50} history={{
        "key": ""
      }} className="stat-mese">
        {statistiche.mesi.map(mese => {
          var curr = mese.mese + mese.anno;
          if (mese.esiste) {
            return (
              <SwiperSlide data-history={`stats-${curr}`} key={curr}>
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
                            <div className={`totale ${mese.entrate > 0 ? ('green') : ('alert')}`}>
                              € {value}
                            </div>
                          } />
                          <span>Entrate</span>
                        </div>
                        <div className="totale col-3 center">
                          <CurrencyFormat value={mese.uscite} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`totale ${mese.uscite > 0 ? ('green') : ('alert')}`}>
                              € {value}
                            </div>
                          } />
                          <span>Uscite</span>
                        </div>
                        <div className="totale col-3 center">
                          <CurrencyFormat value={mese.bilancio} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`totale ${value > 0 ? ('green') : ('alert')}`}>
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
                        <div className="box viewCat" data-categoria={categoria.id} data-inizio={categoria.dataInizio} data-fine={categoria.dataFine} key={curr + "_" + categoria.id}>
                          <div className="icona">
                            <img src={categoria.percorso} alt="" width="100%" />
                          </div>
                          <div className="dati">
                            <div className="motivo">{categoria.Categoria}</div>
                          </div>
                          <CurrencyFormat value={categoria.totale} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
                            <div className={`prezzo ${categoria.totale > 0 ? ('green') : ('alert')}`}>
                              € {value}
                            </div>
                          } />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          } else {
            return (
              <SwiperSlide data-history={`stats-${curr}`} key={curr}>
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