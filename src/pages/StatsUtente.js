import React, { useState, useEffect } from 'react';
import Box from '../components/box';
import BackBar from '../components/backbar';
import Modale from '../components/modale';
import $ from 'jquery';

export function SelUser(props) {

  const seluser = props.user;

  useEffect(() => {
    fetchData();
  }, [])

  const [stats, setStats] = useState({Admin: "", Username: "", Dati: []});

  const fetchData = () => {
    Promise.all([
      fetch(`/API/stats-utente.php?seluser=${seluser}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setStats(data1);
      })
  }

  return (
    <>
      <Box motivo={stats.Dati.email} nonData={`Iscritto il: `} data={stats.Dati.trn_date} nonPrezzo={stats.Dati.username} />
      <Box motivo={`Tema Scelto:`} nonPrezzo={stats.Dati.tema} />
      <Box motivo={`Transazioni Inserite:`} nonData={`Ultima inserita il: `} data={stats.Dati.last_movimenti} nonPrezzo={stats.Dati.movimenti} />
      <Box motivo={`Spazi Creati:`} nonData={`Archiviati: ${stats.Dati.archived_spazi}`} nonPrezzo={stats.Dati.spazi} />
      <Box motivo={`Metodi Aggiunti:`} nonData={`Disabilitati: ${stats.Dati.disabled_metodipagamento}`} nonPrezzo={stats.Dati.metodipagamento} />
      <Box motivo={`Debiti o Crediti:`} nonPrezzo={stats.Dati.debcred} />
      <Box motivo={`Spese Ricorrenti:`} nonPrezzo={stats.Dati.speseric} />
      {/* <Box motivo={`Annunci Nascosti`} nonPrezzo={stats.Dati.annunci} /> */}
    </>
  );
}

export default function StatsUtente(props) {

  const seluser = props.match.params.user;

  useEffect(() => {
    fetchData();
  }, [])

  const [stats, setStats] = useState({Admin: "", Username: "", Dati: []});

  const fetchData = () => {
    Promise.all([
      fetch(`/API/stats-utente.php`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ])
      .then(([res1]) => Promise.all([res1.json()]))
      .then(([data1]) => {
        setStats(data1);
      })
  }

  return (
    <div id="debcred">

      <BackBar text={'Statistiche Utente'} />

      <div className="modal">
        <div className="container">
          {stats.Admin ? (
            seluser ? (
              <SelUser user={seluser} />
            ) : (
              stats.Dati.map(user => (
                <Box link={`/profilo/stats-utente/${user.username}`} motivo={user.username} nonData={`Iscritto il: `} data={user.trn_date} dataPrezzo={user.last_time} />
              ))
            )
          ) : (
            <SelUser user={stats.Username} />
          )}
        </div>
      </div>
    </div>
  );
}