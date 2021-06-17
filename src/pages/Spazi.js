import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import Icona from '../components/iconSpazio';
import CurrencyFormat from 'react-currency-format';
import $, { jQuery } from 'jquery';

function Spazi() {
  useEffect(() => {
    fetchData();
    $(".archivio").on("click", function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
        $("#archivio").removeClass("open");
        $("#archivio").animate({
          height: "0"
        }, 300);
      } else {
        $(this).addClass("open");
        $("#archivio").addClass("open");
        $("#archivio").css({ height: "100%" }, 1);
        var archivio = $("#archivio").height();
        $("#archivio").css({ height: "0px" }, 1);
        $("#archivio").animate({
          height: archivio
        }, 300);
        $("#archivio").animate({ height: "100%" }, 1);
        setTimeout(function () {
          $(document).scrollTop(document.querySelector('#archivio').offsetTop);
        }, 300);
      }
    });
  }, []);

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [SpaziA, setSpaziA] = useState([{
    "id": "1",
    "position": "1",
    "Nome": "Lavoro",
    "Abilitato": "1",
    "Bilancio": "-1800.00",
    "percorso": "/assets/img/icons/business.png",
    "colore": "#cee1f4"
  },
  {
    "id": "2",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "3",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "4",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "5",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "6",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "7",
    "position": "2",
    "Nome": "soddi pigghiati",
    "Abilitato": "1",
    "Bilancio": "90.00",
    "percorso": "/assets/img/icons/stipendio.png",
    "colore": "#e4e4f9"
  },
  {
    "id": "8",
    "position": "3",
    "Nome": "Università",
    "Abilitato": "1",
    "Bilancio": "0",
    "percorso": "/assets/img/icons/educazione.png",
    "colore": "#f9dbd2"
  }]);
  const [SpaziD, setSpaziD] = useState([
    {
      "id": "9",
      "position": "2",
      "Nome": "mi serve per provare ",
      "Abilitato": "0",
      "Bilancio": "0.00",
      "percorso": "/assets/img/icons/banana.png",
      "colore": "#c0e5e4"
    }]);

  const fetchData = () => {
    Promise.all([
      fetch('/API/spazi.php?abilitato=1', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
      fetch('/API/spazi.php?abilitato=0', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setSpaziA(data1);
        setSpaziD(data2);
        setitemsLoaded(true);
      });
  }
  return (
    <div id="spazi" className={itemsLoaded ? (null) : ('preloading')}>
      <div className="top">
        <div className="container">
          <div className="totale">
            <span className="totale">
              Spazi
          </span>
          </div>
          {SpaziD.length != 0 || SpaziD.length == undefined ? (
            <a className="roundbtn archivio">
              <i className="fas fa-archive"></i>
            </a>
          ) : null}
        </div>
      </div>
      <div className="modal">
        <div id="sortable" className="container spazi">
          {SpaziA.length == 0 || SpaziA.length == undefined ? (
            SpaziA.length == 0 ? (
              <div className="container">
                <div className="box">
                  <h2 className="center">Benvenuto in Spazi<br /><span style={{ fontSize: "16px" }}>Ecco una breve guida</span></h2>
                </div>
                <div className="box">
                  <span className="center">Qui potrai creare dei contenitori, come delle cartelle, dove inserire diverse transazioni anche di diverse categorie ad esempio per raggruppare tutte le spese fatte in un viaggio</span>
                </div>
              </div>
            ) : (
              <Icona link={`/spazio/${SpaziA.id}`} id={SpaziA.id} nome={SpaziA.Nome} bilancio={SpaziA.Bilancio} icona={SpaziA.percorso} colore={SpaziA.colore} />
            )
          ) : (
            SpaziA.map(SpazioA => {
              return (
                <Icona link={`/spazio/${SpazioA.id}`} id={SpazioA.id} nome={SpazioA.Nome} bilancio={SpazioA.Bilancio} icona={SpazioA.percorso} colore={SpazioA.colore} />
              )
            })
          )}

          <Icona link={`/spazi/new`} id="nuovo" nuovo={true} />

        </div>
        {SpaziD.length == 0 || SpaziD.length == undefined ? (
          SpaziD.length == 0 ? (
            null
          ) : (
            <div id="archivio" className="container">
              <h2>Spazi Archiviati</h2>
              <div className="spazi">
                <Icona link={`/spazio/${SpaziD.id}`} id={SpaziD.id} nome={SpaziD.Nome} bilancio={SpaziD.Bilancio} icona={SpaziD.percorso} colore={SpaziD.colore} />
              </div>
            </div>
          )
        ) : (
          <div id="archivio" className="container">
            <h2>Spazi Archiviati</h2>
            <div className="spazi">
              {SpaziD.map(SpazioD => {
                return (
                  <Icona link={`/spazio/${SpazioD.id}`} id={SpazioD.id} nome={SpazioD.Nome} bilancio={SpazioD.Bilancio} icona={SpazioD.percorso} colore={SpazioD.colore} />
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Spazi;