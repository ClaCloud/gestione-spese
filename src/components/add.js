import React, { useState, useEffect } from 'react';
import { Soldi, Data, Text, TextArea, Select, Option } from './inputs';
import $, { jQuery } from 'jquery';

export default function AddComponent(props) {

  const [categorie, setCategorie] = useState([]);
  const [metodi, setMetodi] = useState([]);
  const [spazi, setSpazi] = useState([]);

  useEffect(() => {
    
    $("#icona-categoria").css(
      'background-color', $("#categoria").find('option:selected').attr('color')
    );
    $('#icona-categoria img').attr('src', $("#categoria").find('option:selected').attr('img'));

    Promise.all([
      fetch('/API/categorie.php', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }),
      fetch('/API/metodi.php', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }),
      fetch('/API/spazi.php?abilitato=1', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([data1, data2, data3]) => {
        setCategorie(data1);
        setMetodi(data2);
        setSpazi(data3);
      });
  }, [])

  const soldi = props.soldi,
    data = props.data,
    motivo = props.motivo,
    appunti = props.appunti,
    selectedCategoria = props.selectedCategoria,
    selectedMetodo = props.selectedMetodo,
    selectedSpazio = props.selectedSpazio;

  return (
    <div>

      <div id="icona-categoria" className="icona categoria" style={{ backgroundColor: "#FCE0A2" }}>
        <img src="/assets/img/icons/altro.png" width="100%" />
      </div>

      <Select id="categoria" nome="Categoria" required={true}>
        {categorie.map(categoria => (
          <Option key={categoria.id} value={categoria.id} img={categoria.percorso} color={categoria.colore} label={categoria.Categoria} selected={selectedCategoria} />
        ))}
      </Select>

      <Soldi data={soldi} />

      <div className="row no-wrap">

        <div className="col-2">
          <Data id="data" nome="Data" data={data} thin={true} />
        </div>

        <div className="col-2">
          <Select id="metodo" nome="Conto" required={true} thin={true} >
            {metodi.map(metodo => (
              <Option key={metodo.id} value={metodo.id} label={metodo.metodo} selected={selectedMetodo} />
            ))}
          </Select>
        </div>

      </div>

      <Text id="motivo" nome="Motivo Transazione" data={motivo} />

      <div className="row no-wrap invert">

        <Select id="spazio" nome="Spazio" thin={true} class="col" >
          <Option value="NULL" label="Nessuno" />
          {spazi.map(spazio => (
            <Option key={spazio.id} value={spazio.id} img={spazio.percorso} color={spazio.colore} label={spazio.Nome} selected={selectedSpazio} />
          ))}
        </Select>

        <div id="icona-spazio" className="col icona">
          <img src="" width="100%" />
        </div>

      </div>

      <TextArea id="appunti" nome="Appunti Transazione" data={appunti} />

    </div>
  )
}
