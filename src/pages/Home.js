import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import CurrencyFormat from 'react-currency-format';
import Box from '../components/box';
import { Data, Text, Select, Option } from '../components/inputs';
import $, { jQuery } from 'jquery';
import Cookies from 'universal-cookie';

const Home = () => {
  useEffect(() => {

    if (cookies.get('blur')) {
      $("html").addClass("daBlur");
    }

    fetchData();

    $(".cerca i").on("click", function () {
      if ($(this).parent(".cerca").hasClass("open")) {
        $(this).parent(".cerca").removeClass("open");
        $(this).parent(".cerca").parent(".container").parent(".top").removeClass("opened-cerca");
        $("#filter").val('');
        $("#data-filter").val('');
        $("#categoria-filter").val('');
        $("#metodo-filter").val('');
        $("#navbar").animate({
          bottom: "0px"
        }, 300);
        $(".add-new").animate({
          bottom: "77px"
        }, 300);
        //ricerca();
      } else {
        $(this).parent(".cerca").addClass("open");
        $(this).parent(".cerca").parent(".container").parent(".top").addClass("opened-cerca");
        $("#filter").focus();
        $("#navbar").animate({
          bottom: "-70px"
        }, 300);
        $(".add-new").animate({
          bottom: "-70px"
        }, 300).children(".container").children(".clickme").removeClass("clicked");
      }
    });
    $(".fa-eye-change").on("click", function () {
      if ($("html").hasClass("daBlur")) {
        $("html").removeClass("daBlur");
        cookies.remove("blur", { path: '/' });
      } else {
        $("html").addClass("daBlur");
        cookies.set("blur", "true", { path: '/' });
      }
    });
  }, []);

  const cookies = new Cookies();

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

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [movimenti, setMovimenti] = useState([]);
  const [metodi, setMetodi] = useState([{
    "id": "1",
    "metodo": "Portafogli",
    "totale": "19.85",
    "visibile": "1"
  },
  {
    "id": "2",
    "metodo": "N26",
    "totale": "291.78",
    "visibile": "0"
  },
  {
    "id": "3",
    "metodo": "Contanti Nascosti",
    "totale": "10.0004",
    "visibile": "0"
  }]);

  const fetchData = () => {
    Promise.all([
      fetch('/API/metodi.php', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
      fetch('/API/transazioni.php', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        setMovimenti(data2);
        setMetodi(data1);
        setitemsLoaded(true);
      });
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

  metodi.map(metodo => {
    totale = totale - (- metodo.totale)
  })

  return (
    <div id="home">
      <div className="top">
        <div className="container">
          <div href="#" className="roundbtn cerca">
            <Text id="filter" nome="Cerca" />
            <i className="fas fa-search"></i>
          </div>
          <div className="totale">
            <CurrencyFormat value={totale} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
              <span className="totale daBlur">
                € {value}
              </span>
            } />
            <span>Saldo totale <i className="fas fa-eye-change"></i></span>
          </div>
          <div className="cerca-2 row">

            <Data id="data-filter" name="Data" class="col-3" thin={true} />

            <Select id="categoria-filter" nome="Categoria" thin={true} class="col-3">
              <Option value="" label="Nessuna" />
            </Select>

            <Select id="metodo-filter" nome="Metodo" thin={true} class="col-3">
              <Option value="" label="Nessuna" />
            </Select>

          </div>
        </div>
      </div>
      <div className="modal">
        <div className="container">
          {itemsLoaded ? (
            movimenti.length == 0 || movimenti.length == undefined ? (
              movimenti.length == 0 ? (
                <div>

                  <div className="box">
                    <h2 className="center">Benvenuto<br /><span style={{ fontSize: "16px" }}>Ecco una breve guida</span></h2>
                  </div>

                  <div className="box">
                    <span className="center">Puoi andare in <a href="/stats" className="button text bgnero"><i className="fas fa-user"></i> Profilo</a> per cambiare alcune impostazioni, visionare i tuoi metodi di pagamento ed aggiungerne di nuovi</span>
                  </div>
                  <div className="box">
                    <span className="center">Inizia a segnare le tue spese, verranno visualizzate tutte in questa pagina e potrai tenere sempre sotto controllo tutte le tue entrate e le tue uscite</span>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <a href="/add-entrata" className="button bggreen center">
                        <i className="fas fa-plus"></i> Entrata
                      </a>
                    </div>
                    <div className="col-2">
                      <a href="/add-spesa" className="button bgalert center">
                        <i className="fas fa-minus"></i> Uscita
                      </a>
                    </div>
                  </div>
                  <div className="box">
                    <span className="center">Cliccando su <a href="/stats" className="button text bgnero"><i className="fas fa-chart-pie"></i> Stats</a> potrai vedere un riepilogo mensile o annuale del tuo bilancio e un grafico delle categorie così da capire dove spendi di più</span>
                  </div>
                </div>
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
            )
          ) : (
            <div className="preloading">
              <SayMese render={true} label={`Settembre`} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
              <Box motivo={`Motivo Random`} data={`2021-05-27`} prezzo={`200`} icona={``} />
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

export default Home;