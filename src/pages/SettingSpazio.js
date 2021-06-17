import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import AddSpazioComponent from '../components/addSpazio';

export default function Setting(props) {

  useEffect(() => {
    fetchData();
  });

  const [itemsLoaded, setitemsLoaded] = useState(true);
  const [Spazio, setSpazio] = useState({});

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

  const nome = Spazio.Nome,
    icona = Spazio.IDicona,
    percorso = Spazio.percorso,
    colore = Spazio.colore;

  const UpdateSpazio = (event) => {
    event.preventDefault();

    const SelectedIcona = $("input[type=radio]:checked").val() ?? $(`input[type=radio][id=${icona}]`).val(),
        SelectedNome = $("input[name=spazio]").val();

    console.log("icona: ", SelectedIcona, " Nome: ", SelectedNome);

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
            window.location.replace("/spazio/"+id);
          } else {
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
              <button type="submit" className="button mini bgprimary marbot">Conferma</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  )
}