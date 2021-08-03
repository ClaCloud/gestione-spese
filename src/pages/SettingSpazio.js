import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import AddSpazioComponent from '../components/addSpazio';

export default function Setting(props) {

  useEffect(() => {
    fetchData();
  });

  const [itemsLoaded, setitemsLoaded] = useState(false);
  const [Spazio, setSpazio] = useState([
    {
      "id": "2",
      "position": "0",
      "Abilitato": "1",
      "Bilancio": "0.00",
      "IDicona": "17",
      "percorso": "/assets/img/icons/mappamondo.png",
      "colore": "#fce0a2"
    }
  ]);

  const id = props.match.params.id;

  const fetchData = () => {
    Promise.all([
      fetch(`/API/spazi.php?id=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setSpazio(data1);
        setitemsLoaded(true);
      });
  }

  const nome = Spazio[0].Nome,
    icona = Spazio[0].IDicona,
    percorso = Spazio[0].percorso,
    colore = Spazio[0].colore,
    abilitato = Spazio[0].Abilitato;

  const UpdateSpazio = (event) => {
    event.preventDefault();
    $(".wrap-caricamento").addClass("visible");

    const SelectedIcona = $("input[type=radio]:checked").val() ?? $(`input[type=radio][id=${icona}]`).val(),
      SelectedNome = $("input[name=spazio]").val();

    $.ajax({
      type: "POST",
      url: "/API/modificaSpazio.php",
      data: {
        id: id,
        icona: SelectedIcona,
        nome: SelectedNome
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          window.history.back();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }
  const archiviaSpazio = () => {
    $(".wrap-caricamento").addClass("visible");

    $.ajax({
      type: "POST",
      url: "/API/archiviaSpazio.php",
      data: {
        id: id,
        abilitato: abilitato
      },
      success: function (response) {
        if (response == true) {
          $(".wrap-caricamento").removeClass("visible");
          window.history.back();
        } else {
          $(".wrap-caricamento").removeClass("visible");
          alert(response)
        }
      }
    });
  }

  return (
    <div id="settingSpazio" className={itemsLoaded ? (null) : ('preloading')}>
      <BackBar text={`Impostazioni`} />
      <div className="container">
        <form onSubmit={UpdateSpazio}>
          <AddSpazioComponent nome={nome} percorso={percorso} colore={colore} />
          <div className="fixed bot">
            <div className="container">
              <div className="row a-center">
                <div className="col-3-2">
                  <button type="submit" className="button mini bgprimary marbot">Conferma</button>
                </div>
                <div className="col-3">
                  <div className="button bgalert mini marbot" onClick={archiviaSpazio}>{abilitato == 1 ? 'Archivia' : 'Rispristina'}</div>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}