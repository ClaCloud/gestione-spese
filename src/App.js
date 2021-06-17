import React, { useEffect } from 'react';
import moment from 'moment';

import './App.scss';
import './SCSS/fontawesome.css';

import Navbar from './components/Navbar';
import AddNew from './components/addNew';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Add from './pages/Add';
import Transazione from './pages/Transazione';
import Spazi from './pages/Spazi';
import AddSpazio from './pages/AddSpazio';
import SettingSpazio from './pages/SettingSpazio';
import Spazio from './pages/Spazio';
import Stats from './pages/Stats';
import Profilo from './pages/Profilo';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import $, { jQuery } from 'jquery';
import Cookies from 'universal-cookie';

function App() {

  const cookies = new Cookies();

  useEffect(() => {

    if (cookies.get('tema') == 'scuro') {
      $("html").removeClass("chiaro").addClass("scuro");
      $("#tema").attr("checked", true);
      $("meta[name=theme-color]").attr("content", "#000000");
    } else {
      $("html").removeClass("scuro").addClass("chiaro");
      $("#tema").attr("checked", false);
      $("meta[name=theme-color]").attr("content", "#FFFFFF");
    }

    moment.locale('it');
  }, []);

  var CurrencyFormat = require('react-currency-format');

  var dateFormat = require("dateformat");
  dateFormat.i18n = {
    dayNames: [
      "Dom",
      "Lun",
      "Mar",
      "Mer",
      "Gio",
      "Ven",
      "Sab",
      "Domenica",
      "Lunedì",
      "Martedì",
      "Mercoledì",
      "Giovedì",
      "Venerdì",
      "Sabato",
    ],
    monthNames: [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dic",
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
  };
  return (
    <Router>
      <div className="App">
        <Route exact path="/home">
          <AddNew />
          <Navbar />
        </Route>
        <Route exact path="/spazi">
          <Navbar />
        </Route>
        <Route exact path="/stats:mese?">
          <Navbar />
        </Route>
        <Route exact path="/profilo">
          <Navbar />
        </Route>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/add-:tipo/:Categoria?/:Soldi?/:Metodo?/:Motivo?/:Spazio?/:Appunti?" component={Add} />
          <Route exact path="/transazione/:id" component={Transazione} />
          <Route exact path="/stats:mese?" component={Stats} />
          <Route exact path="/spazi" component={Spazi} />
          <Route exact path="/spazi/new" component={AddSpazio} />
          <Route exact path="/spazio/:id" component={Spazio} />
          <Route exact path="/spazio/:id/setting" component={SettingSpazio} />
          <Route exact path="/profilo" component={Profilo} />
        </Switch>
        <Route exact path="/add-:tipo/:Categoria?/:Soldi?/:Metodo?/:Motivo?/:Spazio?/:Appunti?">
          <AddNew />
        </Route>
      </div>
    </Router>
  );
}

export default App;
