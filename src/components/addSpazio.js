import React, { useState, useEffect } from 'react';
import { Text, Select, Option } from './inputs';
import Modale from '../components/modale';
import $ from 'jquery';

export default function AddSpazioComponent(props) {

  const [icone, setIcone] = useState([]);

  const fetchData = () => {
    Promise.all([
      fetch('/API/icons.php', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setIcone(data1);
      });
  }

  function changeSpaceIcon(x) {
    var color = x.attr('color');
    var img = x.attr('img');
    $("#icona-spazio")
      .css('background-color', color)
      .children("img").attr('src', img);
  }

  function iconRatio() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var cw = $("label.spazio").width();
    if (viewportWidth <= 460 && viewportWidth >= 350) {
      $("label.spazio").css("height", cw + "px");
    } else {
      $("label.spazio").css("height", "175px");
    }
  }

  useEffect(() => {

    fetchData();

    $(window).on("ready", async function () {
      iconRatio();
    });

    $('#root').on("change", 'input[type=radio][name=icona_spazio]', function () {
      changeSpaceIcon($(this));
    });

    $(window).on("resize", function () {
      iconRatio();
    });

    $(".error").on("click", function () {
      $(this).removeClass("visible");
    });

  }, [])

  const nome = props.nome,
    percorso = props.percorso ?? "/assets/img/icons/altro.png",
    colore = props.colore ?? "rgb(252, 224, 162)";


  return (
    <div id="setting_spazio">

      <Modale
        className="icona-spazio"
        content={
          <div>

            <Text id="filter-icon" nome={"Cerca"} thin={true} />

            <div className="iconlist">
              {icone.map(icona => (
                <label htmlFor={icona.id} key={icona.id} className="spazio close-modal">
                  <input type="radio" id={icona.id} name="icona_spazio" placeholder=" " value={icona.id} color={icona.colore} img={icona.percorso} />
                  <div className="icona close-modal" style={{ backgroundColor: icona.colore }}>
                    <img src={icona.percorso} alt="icona spazio" />
                  </div>
                  <div className="hidden">
                    {icona.nome}
                  </div>
                </label>
              ))}
            </div>

            <div className="sticky bot bgbianco">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <a className="button mini bgalert marboth close-modal">Chiudi</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />


      <div className="container">
        <div className="selicon">
          <div className="spazio perm">
            <div id="icona-spazio" className="icona open-modal" style={{ backgroundColor: colore}}>
              <img src={percorso} alt="icona spazio" />
              <div className="modifica">
                <i className="fas fa-pencil"></i>
              </div>
            </div>
          </div>
        </div>

        <Text id="spazio" nome="Nome" data={nome} required={true} thin={true} />

        <span className="error">
          Seleziona un'icona!
        </span>
      </div>

    </div>
  )
}
