import React, { useState, useEffect } from 'react';
import Box from '../components/box';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, {
  Navigation, History
} from 'swiper/core';

import CurrencyFormat from 'react-currency-format';
import $, { jQuery } from 'jquery';

SwiperCore.use([Navigation, History]);

function StatsAnno() {

  $(".App").addClass("statsAnno");

  useEffect(() => {
    fetchData();
  }, [])

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [statistiche, setStatistiche] = useState({
    "anni": [
      {
        "anno": "2020",
        "entrate": "97.12",
        "uscite": "-94.25",
        "bilancio": "92.87"
      }
    ],
    "inner": {
      "2020": [
        {
          "mese": "gennaio",
          "entrate": "157.50",
          "uscite": "-76.98",
          "bilancio": "80.52"
        },
        {
          "mese": "febbraio",
          "entrate": "170.00",
          "uscite": "-18.40",
          "bilancio": "151.6"
        },
        {
          "mese": "marzo",
          "entrate": "270.48",
          "uscite": "-137.81",
          "bilancio": "132.67"
        },
        {
          "mese": "aprile",
          "entrate": "0",
          "uscite": "0",
          "bilancio": "0"
        },
        {
          "mese": "maggio",
          "entrate": "7.77",
          "uscite": "-12.50",
          "bilancio": "-4.73"
        },
        {
          "mese": "giugno",
          "entrate": "10.00",
          "uscite": "-76.95",
          "bilancio": "-66.95"
        },
        {
          "mese": "luglio",
          "entrate": "103.00",
          "uscite": "-84.25",
          "bilancio": "18.75"
        },
        {
          "mese": "agosto",
          "entrate": "130.00",
          "uscite": "-223.56",
          "bilancio": "-93.6"
        },
        {
          "mese": "settembre",
          "entrate": "43.00",
          "uscite": "-200.95",
          "bilancio": "-157.95"
        },
        {
          "mese": "ottobre",
          "entrate": "6.35",
          "uscite": "-86.45",
          "bilancio": "-80.1"
        },
        {
          "mese": "novembre",
          "entrate": "25.00",
          "uscite": "-26.38",
          "bilancio": "-1.38"
        },
        {
          "mese": "dicembre",
          "entrate": "24.02",
          "uscite": "-0.02",
          "bilancio": "24"
        }
      ]
    }
  });

  const fetchData = () => {
    fetch('/API/stats-anno.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setStatistiche(myJson);
        setitemsLoaded(true);
      });
  }

  return (
    <div id="stats" className={itemsLoaded ? (null) : ('preloading')}>
      <Swiper dir="rtl" autoHeight={true} slidesPerView={'auto'} centeredSlides={true} spaceBetween={50} history={{
        "key": ""
      }} className="stat-anno">
        {statistiche.anni.map(anno => {
          var curr = anno.anno;
          return (
            <SwiperSlide data-history={`stats-anno-${curr}`} key={curr}>
              <div className="mese-S">
                <div className="top">
                  <div className="container">
                    <h2 className="mese">{anno.anno}</h2>
                    <div className="row">
                      <div className="totale col-3 center">
                        <CurrencyFormat
                          value={anno.entrate}
                          isNumericString={true}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={(value) => (
                            <div
                              className={`totale daBlur ${
                                anno.entrate > 0
                                  ? "green"
                                  : anno.entrate < 0
                                  ? "alert"
                                  : null
                              }`}
                            >
                              € {value}
                            </div>
                          )}
                        />
                        <span>Entrate</span>
                      </div>
                      <div className="totale col-3 center">
                        <CurrencyFormat
                          value={anno.uscite}
                          isNumericString={true}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={(value) => (
                            <div
                              className={`totale daBlur ${
                                anno.uscite > 0
                                  ? "green"
                                  : anno.uscite < 0
                                  ? "alert"
                                  : null
                              }`}
                            >
                              € {value}
                            </div>
                          )}
                        />
                        <span>Uscite</span>
                      </div>
                      <div className="totale col-3 center">
                        <CurrencyFormat
                          value={anno.bilancio}
                          isNumericString={true}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          renderText={(value) => (
                            <div
                              className={`totale daBlur ${
                                anno.bilancio > 0
                                  ? "green"
                                  : anno.bilancio < 0
                                  ? "alert"
                                  : null
                              }`}
                            >
                              € {value}
                            </div>
                          )}
                        />
                        <span>Bilancio</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal">
                  <div className="container">
                    {statistiche.inner[curr].map((mese) => (
                      <div className="box mese">
                        <div className="row">
                          <div className="col-3 mse">{mese.mese}</div>
                          <div className="col-3 prz">
                            <CurrencyFormat
                              value={mese.entrate}
                              isNumericString={true}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              renderText={(value) => (
                                <div
                                  className={`prezzo daBlur ${
                                    mese.entrate > 0
                                      ? "green"
                                      : mese.entrate < 0
                                      ? "alert"
                                      : null
                                  }`}
                                >
                                  {mese.entrate == 0 ? "-" : `€ ${value}`}
                                </div>
                              )}
                            />
                            <span>Entrate</span>
                          </div>
                          <div className="col-3 prz">
                            <CurrencyFormat
                              value={mese.uscite}
                              isNumericString={true}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              renderText={(value) => (
                                <div
                                  className={`prezzo daBlur ${
                                    mese.uscite > 0
                                      ? "green"
                                      : mese.uscite < 0
                                      ? "alert"
                                      : null
                                  }`}
                                >
                                  {mese.uscite == 0 ? "-" : `€ ${value}`}
                                </div>
                              )}
                            />
                            <span>Uscite</span>
                          </div>
                          <div className="col-3 prz">
                            <CurrencyFormat
                              value={mese.bilancio}
                              isNumericString={true}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              decimalScale={2}
                              fixedDecimalScale={true}
                              renderText={(value) => (
                                <div
                                  className={`prezzo daBlur ${
                                    mese.bilancio > 0
                                      ? "green"
                                      : mese.bilancio < 0
                                      ? "alert"
                                      : null
                                  }`}
                                >
                                  {mese.bilancio == 0 ? "-" : `€ ${value}`}
                                </div>
                              )}
                            />
                            <span>Bilancio</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default StatsAnno;