import React, { useState, useEffect } from 'react';
import BackBar from '../components/backbar';
import $, { jQuery } from 'jquery';
import AddSpazioComponent from '../components/addSpazio';

export default function Setting (props) {

  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    $(`input[type=radio][name=icona_spazio][id=${icona}]`).attr("checked", true);
  }, []);

  const [itemsLoaded, setitemsLoaded] = useState(true);
  const [Spazio, setSpazio] = useState([]);

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
    icona = Spazio.IDicona;

  const UpdateSpazio = (event) => {
    event.preventDefault();
    if ($('input[type="radio"]').is(':checked')) {
      // const icona = $("input[type=radio]:checked").val(),
      //   nome = $("input[name=spazio]").val();

      // $.ajax({
      //   type: "POST",
      //   url: "/API/addSpazio.php",
      //   data: {
      //     icona: icona,
      //     nome: nome
      //   },
      //   success: function (response) {
      //     if (response == true) {
      //       window.location.replace("/spazo/"+id);
      //     } else {
      //       alert(response)
      //     }
      //   }
      // });
    } else {
      $(".error").addClass("visible");
    }
  }

  return (
    <div id="settingSpazio" className={itemsLoaded ? (null) : ('preloading')}>
      <BackBar text={`Impostazioni`} />
      <div className="container">
        <form onSubmit={UpdateSpazio}>
          <AddSpazioComponent nome={nome} icona={icona} />
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