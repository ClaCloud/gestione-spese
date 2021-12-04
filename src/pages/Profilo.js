import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "../components/box";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import Modale from "../components/modale";
import CurrencyFormat from "react-currency-format";
import $, { jQuery } from "jquery";
import Cookies from "universal-cookie";

SwiperCore.use([Pagination]);

function Card(props) {
  return (
    <div className="carta">
      <span>
        Saldo
        <div data-metod={props.id} className="imp visi-metod">
          <i className={`fas fa-eye${props.visibile == 0 ? "-slash" : ""}`}></i>
          <span className="hover">
            {props.visibile == 1 ? "Nascondi" : "Aggiungi"} al totale
          </span>
        </div>
      </span>
      <CurrencyFormat
        value={props.soldi}
        isNumericString={true}
        displayType={"text"}
        thousandSeparator={"."}
        decimalSeparator={","}
        decimalScale={2}
        fixedDecimalScale={true}
        renderText={(value) => <span className="totale daBlur">€ {value}</span>}
      />
      <span className="nome_carta">
        {props.metodo}
        <a
          data-modal={`metodo`}
          data-id={props.id}
          data-metodo={props.metodo}
          data-totale={props.soldi}
          className="imp open-modal"
        >
          <i className="fas fa-cog"></i>
        </a>
      </span>
    </div>
  );
}

function Profilo() {
  const cookies = new Cookies();

  useEffect(() => {
    setUsername(cookies.get("username"));

    fetchMetodi();

    if ($("html").hasClass("scuro")) {
      $("#tema").attr("checked", true);
    } else {
      $("#tema").attr("checked", false);
    }

    $("#root").on("click", ".visi-metod", function () {
      var idMetodo = $(this).attr("data-metod");
      $(".wrap-caricamento").addClass("visible");

      $.ajax({
        type: "POST",
        url: "/API/visi-metod.php",
        data: { idMetodo: idMetodo },
        success: function (response) {
          $(".wrap-caricamento").removeClass("visible");
          if (response == true) {
            fetchMetodi();
          } else {
            alert(response);
          }
        },
      });
    });

    $("#root").on("click", ".imp.open-modal", function () {
      var id = $(this).attr("data-id");
      var metodo = $(this).attr("data-metodo");
      var totale = $(this).attr("data-totale");
      setmodalMetodo({ id: id, metodo: metodo, totale: totale });
    });
  }, []);

  const [username, setUsername] = useState("Username");
  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [modalMetodo, setmodalMetodo] = useState({
    id: "",
    metodo: "",
    totale: "",
  });
  const [metodi, setMetodi] = useState([
    {
      id: "1",
      metodo: "Portafogli",
      totale: "20.00",
      visibile: "1",
    },
    {
      id: "2",
      metodo: "N26",
      totale: "50.00",
      visibile: "1",
    },
  ]);

  const fetchMetodi = () => {
    fetch("/API/metodi.php")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMetodi(myJson);
        setitemsLoaded(true);
      });
  };

  //CAMBIO TEMA
  var tema = "";
  function CambioTema() {
    if ($("html").hasClass("scuro")) {
      $("html").removeClass("scuro").addClass("chiaro");
      $("#tema").attr("checked", false);
      $("meta[name=theme-color]").attr("content", "#FFFFFF");
      tema = "chiaro";
    } else {
      $("html").removeClass("chiaro").addClass("scuro");
      $("#tema").attr("checked", true);
      $("meta[name=theme-color]").attr("content", "#000000");
      tema = "scuro";
    }
    $.ajax({
      type: "POST",
      url: "/API/cambio-tema.php",
      data: { Ntema: tema },
    });
  }

  const ModMet = (event) => {
    event.preventDefault();
    const id = modalMetodo.id,
      metodo = $("input#metodo").val(),
      totale = $("input#totale").val();

    $.ajax({
      type: "POST",
      url: "/API/ModMet.php",
      data: { id: id, metodo: metodo, totale: totale },
      success: function (response) {
        if (response) {
          fetchMetodi();
          $(".modale[data-modal=metodo]").removeClass("open");
        } else {
          alert(response);
        }
      },
    });
  };
  const ElMet = (event) => {
    event.preventDefault();
    const id = modalMetodo.id;

    $.ajax({
      type: "POST",
      url: "/API/ElMet.php",
      data: { id: id },
      success: function (response) {
        if (response) {
          fetchMetodi();
          $(".modale[data-modal=metodo]").removeClass("open");
        } else {
          alert(response);
        }
      },
    });
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<h3 class="selection ${className}">${
        index === 0 ? "Modifica" : "Elimina"
      }</h3>`;
    },
  };

  return (
    <div id="profilo" className={itemsLoaded ? null : "preloading"}>
      <Modale
        dataModale="metodo"
        content={
          <Swiper
            pagination={pagination}
            autoHeight={true}
            spaceBetween={20}
            className="modmetSlider"
          >
            <SwiperSlide>
              <form onSubmit={ModMet} style={{ paddingBottom: "0px" }}>
                <div>
                  <div className="row">
                    <div className="col">
                      <p>
                        Modifica il nome o il saldo di{" "}
                        <b>{modalMetodo.metodo}</b>
                      </p>
                    </div>
                  </div>
                  <label htmlFor="metodo">
                    <input
                      type="text"
                      name="metodo"
                      id="metodo"
                      placeholder=" "
                      defaultValue={modalMetodo.metodo}
                      required
                    />
                    <span className="placeholder">Nuovo Nome</span>
                  </label>
                  <label htmlFor="totale">
                    <input
                      type="text"
                      name="totale"
                      id="totale"
                      placeholder=" "
                      className="numeric"
                      defaultValue={modalMetodo.totale}
                      maxLength="10"
                      inputMode="decimal"
                      required
                    />
                    <span className="placeholder">Nuovo saldo</span>
                  </label>
                </div>
                <div className="row no-wrap">
                  <div className="col-2">
                    <button type="submit" className="button mini">
                      Conferma
                    </button>
                  </div>
                  <div className="col-2">
                    <a
                      data-modal="metodo"
                      className="button mini bgalert close-modal"
                    >
                      Annulla
                    </a>
                  </div>
                </div>
              </form>
            </SwiperSlide>
            {modalMetodo.id === "1" ? null : (
              <SwiperSlide hidden={modalMetodo.id === 1 ? true : false}>
                <form onSubmit={ElMet} style={{ paddingBottom: "0px" }}>
                  <div>
                    <div className="row">
                      <div className="col">
                        <p>
                          Confermi di voler eliminare{" "}
                          <b>{modalMetodo.metodo}</b>?
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row no-wrap">
                    <div className="col-2">
                      <button type="submit" className="button mini">
                        Conferma
                      </button>
                    </div>
                    <div className="col-2">
                      <a
                        data-modal="metodo"
                        className="button mini bgalert close-modal"
                      >
                        Annulla
                      </a>
                    </div>
                  </div>
                </form>
              </SwiperSlide>
            )}
          </Swiper>
        }
      />
      <div className="top">
        <div className="container">
          <h2>Metodi di pagamento</h2>
        </div>
        <div className="totmetodi">
          <Swiper
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={10}
            className="mySwiper"
          >
            {metodi.map((card) => (
              <SwiperSlide>
                <Card
                  key={card.id}
                  id={card.id}
                  visibile={card.visibile}
                  metodo={card.metodo}
                  soldi={card.totale}
                />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div className="carta">
                <div className="aggiungi">
                  <span className="icona">
                    <i className="fas fa-plus"></i>
                  </span>
                  <span className="testo">
                    Aggiungi un nuovo metodo di pagamento
                  </span>
                </div>
                <Link to="/profilo/new-metodo" className="invisibile"></Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="modal">
        <div className="container">
          <div className="init row no-wrap">
            <div className="col-3-2">
              <span className="benvenuto">Ciao, {username}</span>
              <span className="frasetta">Di cosa hai bisogno?</span>
            </div>
            <div className="col-3">
              <a href="/logout.php" className="button mini bgalert">
                <span>Logout</span> <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>

          <Box
            link={`/profilo/debcred`}
            icona={"/assets/img/check.png"}
            motivo={"Debiti e Crediti"}
            nonData={`Inserisci i debiti o i crediti che hai, così da non dimenticare nulla`}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <Box
            link={`/profilo/speseric`}
            icona={"/assets/img/ricorrente.png"}
            motivo={"Spese Fisse"}
            nonData={`Inserisci spese con cadenza mensile o annuale`}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <h3 className="say-mese auTop">Impostazioni</h3>

          <Box
            icona={"/assets/img/icons/icons8-moon-and-stars-100.png"}
            motivo={"Tema Scuro"}
            nonPrezzo={
              <label htmlFor="tema" className="switch" onClick={CambioTema}>
                <input type="checkbox" id="tema" name="tema" />
                <span className="slider"></span>
              </label>
            }
          />

          <Box
            link={`/profilo/categorie`}
            icona={"/assets/img/icons/cartella.png"}
            motivo={"Modifica Categorie"}
            nonData={`Gestisci liberamente le tue categorie`}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <Box
            link={`/profilo/rec-metodo`}
            icona={"/assets/img/icons/icons8-credit-card-100.png"}
            motivo={"Recupero Metodi"}
            nonData={`Recupera Metodi di Pagamento eliminati`}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <Box
            link={`/profilo/stats-utente`}
            icona={"/assets/img/search.png"}
            motivo={"Statistiche Utente"}
            nonData={`Controlla tutti i dati raccolti sul tuo account`}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <Box
            link={`/profilo/password`}
            icona={"/assets/img/password.png"}
            motivo={"Modifica Password"}
            nonPrezzo={<i className="fas fa-chevron-right"></i>}
          />

          <a className="box bgalert bianco open-modal" data-modal="elimina">
            <div className="icona">
              <img src="/assets/img/error.png" alt="" width="100%" />
            </div>
            <div className="dati">
              <span className="motivo">Elimina Account</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profilo;
