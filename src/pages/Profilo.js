import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import CurrencyFormat from 'react-currency-format';
import $, { jQuery } from 'jquery';
import Cookies from 'universal-cookie';

function Card(props) {
  return (
    <div class="carta">
      <span>
        Saldo
        <div data-metod="1" class="imp visi-metod"><i class="fas fa-eye"></i><span class="hover">Nascondi al totale</span></div>
      </span>
      <CurrencyFormat value={props.soldi} isNumericString={true} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale={true} renderText={value =>
        <span class="totale">€ {value}</span>
      } />
      <span class="nome_carta">
        {props.metodo}
        <a data-modal="metodo_" class="imp open-modal"><i class="fas fa-cog"></i></a>
      </span>
    </div>
  )
}

function Profilo() {

  const cookies = new Cookies();

  useEffect(() => {

    setUsername(cookies.get('username'));

    fetchMetodi();

    if ($("html").hasClass("scuro")) {
      $("#tema").attr("checked", true);
    } else {
      $("#tema").attr("checked", false);
    }
  }, [])

  const [username, setUsername] = useState('Username');
  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [metodi, setMetodi] = useState([{
    "id": "1",
    "metodo": "Portafogli",
    "totale": "20.00",
    "visibile": "1"
  },]);

  const fetchMetodi = () => {
    fetch('/API/metodi.php')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setMetodi(myJson);
        setitemsLoaded(true);
      });
  }


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
      data: { Ntema: tema }
    });
  };

  return (
    <div id="profilo" className={itemsLoaded ? (null) : ('preloading')}>

      <div class="top">
        <div class="container">
          <h2>Metodi di pagamento</h2>
        </div>
        <div class="totmetodi">
          <Swiper slidesPerView={'auto'} centeredSlides={true} spaceBetween={10} className="mySwiper">
            {metodi.map(card => (
              <SwiperSlide>
                <Card key={card.id} metodo={card.metodo} soldi={card.totale} />
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <div class="carta">
                <div class="aggiungi">
                  <span class="icona"><i class="fas fa-plus"></i></span>
                  <span class="testo">Aggiungi un nuovo metodo di pagamento</span>
                </div>
                <a href="/profilo/new-metodo" class="invisibile"></a>
              </div>
            </SwiperSlide>
          </Swiper>


        </div>

      </div >

      <div class="modal">
        <div class="container">
          <div class="init row no-wrap">
            <div class="col-3-2">
              <span class="benvenuto">Ciao, {username}</span>
              <span class="frasetta">Di cosa hai bisogno?</span>
            </div>
            <div class="col-3">
              <a href="/logout.php" class="button mini bgalert"><span>Logout</span> <i class="fas fa-sign-out-alt"></i></a>
            </div>
          </div>

          <Box link={`debcred`} icona={'/assets/img/check.png'} motivo={'Debiti e Crediti'} />

          <Box link={`speseric`} icona={'/assets/img/ricorrente.png'} motivo={'Spese Ricorrenti'} />

          <h3 className="say-mese auTop" >Impostazioni</h3>

          <Box
            icona={'/assets/img/icons/icons8-moon-and-stars-100.png'}
            motivo={'Tema Scuro'}
            nonPrezzo={
              <label htmlFor="tema" className="switch" onClick={CambioTema}>
                <input type="checkbox" id="tema" name="tema" />
                <span className="slider"></span>
              </label>
            }
          />

          <Box link={`categorie`} icona={'/assets/img/icons/cartella.png'} motivo={'Modifica Categorie'} />

          <Box link={`rec-metodo`} icona={'/assets/img/icons/icons8-credit-card-100.png'} motivo={'Recupera Metodi di Pagamento eliminati'} />

          <Box link={`stats-utente`} icona={'/assets/img/search.png'} motivo={'Statistiche Utente'} />

          <Box link={`password`} icona={'/assets/img/password.png'} motivo={'Modifica Password'} />

          <Box link={`categorie`} icona={'/assets/img/icons/cartella.png'} motivo={'Modifica Categorie'} />

          <a class="box bgalert bianco open-modal" data-modal="elimina" data-aos="fade-up" data-aos-duration="300" data-aos-easing="ease-in-out" data-aos-once="true" data-aos-anchor-placement="bottom" data-aos-offset="65">
            <div class="icona">
              <img src="/assets/img/error.png" alt="" width="100%" />
            </div>
            <div class="dati">
              <span class="motivo">Elimina Account</span>
            </div>
          </a>
        </div>
      </div>
    </div >
  );
}

export default Profilo;
