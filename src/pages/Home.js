import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import CurrencyFormat from 'react-currency-format';
import Box from '../components/box';
import { Data, Text, Select, Option } from '../components/inputs';
import $ from 'jquery';

const Home = () => {

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [movimenti, setMovimenti] = useState([]);
  const [search, setSearch] = useState({ text: "", date: "", categoria: "", metodo: "" });
  const [filtered, setFiltered] = useState([]);
  const [metodi, setMetodi] = useState([{
    "id": "1",
    "metodo": "Contanti",
    "totale": "0",
    "visibile": "1"
  }]);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {

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
        setSearch({ text: "", date: "", categoria: "", metodo: "" });
        setFiltered([]);
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
        //Search();
      }
    });
  }, []);

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

  const Search = (e) => {
    switch (e.currentTarget.name) {
      case 'filter':
        setSearch({ ...search, text: e.currentTarget.value });
        break;
      case 'data-filter':
        setSearch({ ...search, date: e.currentTarget.value });
        break;
      case 'categoria-filter':
        setSearch({ ...search, categoria: e.currentTarget.value });
        break;
      case 'metodo-filter':
        setSearch({ ...search, metodo: e.currentTarget.value });
        break;
      default:
        console.log(`Sorry, we are out of ${e.currentTarget.name}.`);
    }
  }
  useEffect(() => {
    if (search.text !== '' || search.date !== '' || search.categoria !== '' || search.metodo !== '') {
      $.ajax({
        type: "POST",
        url: `/API/transazioni.php`,
        data: {
          cerca: true,
          text: search.text,
          date: search.date,
          categoria: search.categoria,
          metodo: search.metodo
        },
        success: function (response) {
          setFiltered(response);
        }
      });
    }
  }, [search]);

  const fetchData = () => {
    Promise.all([
      fetch('/API/categorie.php', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
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
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        setMovimenti(data3);
        setMetodi(data2);
        setCategorie(data1);
        setitemsLoaded(true);
      });
  }

  var totale = 0;
  metodi.map(metodo => {
    if (metodo.visibile == 1) {
      totale = totale - (- metodo.totale)
    }
  })

  return (
    <div id="home">
      <div className="top">
        <div className="container">
          <div href="#" className="roundbtn cerca">
            <label htmlFor={`filter`} >
              <input type="text" id={`filter`} name={`filter`} placeholder=" " maxLength="30" onChange={Search} />
              <span className="placeholder">{`Cerca`}</span>
            </label>
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

            {/* <Data id="data-filter" name="Data" class="col-3" thin={true} /> */}

            <label htmlFor={`categoria-filter`} className={`select-wrap col-3 thin`}>
              <select id={`categoria-filter`} name={`categoria-filter`} onChange={Search}>
                <Option value="" label="Nessuna" />
                {categorie.map(categoria => (
                  <Option key={categoria.id} value={categoria.id} label={categoria.Categoria} />
                ))}
              </select>
              <span className="placeholder">{`Categoria`}</span>
            </label >

            <label htmlFor={`metodo-filter`} className={`select-wrap col-3 thin`}>
              <select id={`metodo-filter`} name={`metodo-filter`} onChange={Search}>
                <Option value="" label="Nessuna" />
                {metodi.map(metodo => (
                  <Option key={metodo.id} value={metodo.id} label={metodo.metodo} />
                ))}
              </select>
              <span className="placeholder">{`Metodo`}</span>
            </label >

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
                filtered.length == 0 ? (
                  Object.keys(movimenti).map((key, i) => (
                    <div className="box-temporale">
                      <SayMese render={true} label={key} />
                      {movimenti[key].map(movimento => (
                        <Box key={i} motivo={movimento.Motivo} data={movimento.Data} prezzo={movimento.Soldi} icona={movimento.percorso} link={`/transazione/${movimento.id}`} id={movimento.id} appuntiFilter={movimento.Appunti} />
                      ))}
                    </div>
                  ))
                ) : (
                  Object.keys(filtered).map((key, i) => (
                    <div className="box-temporale">
                      <SayMese render={true} label={key} />
                      {filtered[key].map(movimento => (
                        <Box key={i} motivo={movimento.Motivo} data={movimento.Data} prezzo={movimento.Soldi} icona={movimento.percorso} link={key === 'risultati' ? '' : `/transazione/${movimento.id}`} id={movimento.id} appuntiFilter={movimento.Appunti} />
                      ))}
                    </div>
                  ))
                )
              )
            ) : null
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