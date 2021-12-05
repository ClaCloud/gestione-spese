import React, { useEffect, useState } from "react";
import moment from "moment";

import "./App.scss";
import "./SCSS/fontawesome.css";

import Navbar from "./components/Navbar";
import StatNav from "./components/statNav";
import AddNew from "./components/addNew";
import E404 from "./components/E404";
import Offline from "./components/offline";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Trasferimento from "./pages/trasferimento";
import Transazione from "./pages/Transazione";
import Spazi from "./pages/Spazi";
import AddSpazio from "./pages/AddSpazio";
import SettingSpazio from "./pages/SettingSpazio";
import Spazio from "./pages/Spazio";
import Stats from "./pages/Stats";
import StatsAnno from "./pages/StatsAnno";
import Profilo from "./pages/Profilo";
import AddMetodo from "./pages/AddMetodo";
import DebCred from "./pages/debcred";
import DebCred_id from "./pages/debcred_id";
import SpeseRic from "./pages/speseric";
import SpeseRic_id from "./pages/speseric_id";
import StatsUtente from "./pages/StatsUtente";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import $, { jQuery } from "jquery";
import Cookies from "universal-cookie";

function App() {
  const [isOnline, setIsOnline] = useState(false);

  window.addEventListener(
    "load",
    function (e) {
      if (navigator.onLine) {
        console.log("We're online!");
        setIsOnline(true);
      } else {
        console.log("We're offline...");
        setIsOnline(false);
      }
    },
    false
  );

  window.addEventListener(
    "online",
    function (e) {
      console.log("And we're back :).");
      setIsOnline(true);
    },
    false
  );

  window.addEventListener(
    "offline",
    function (e) {
      console.log("Connection is down.");
      setIsOnline(false);
    },
    false
  );

  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("tema") == "chiaro") {
      $("html").removeClass("scuro").addClass("chiaro");
      $("#tema").attr("checked", false);
      $("meta[name=theme-color]").attr("content", "#FFFFFF");
    } else {
      $("html").removeClass("chiaro").addClass("scuro");
      $("#tema").attr("checked", true);
      $("meta[name=theme-color]").attr("content", "#000000");
    }

    moment.locale("it");
  }, []);

  var CurrencyFormat = require("react-currency-format");

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
        <Route exact path="/stats-mese:mese?">
          <Navbar />
          <StatNav />
        </Route>
        <Route exact path="/stats-anno:anno?">
          <Navbar />
          <StatNav />
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
          <Route
            exact
            path="/add-:tipo/:Categoria?/:Soldi?/:Metodo?/:Motivo?/:Spazio?/:Appunti?"
            component={isOnline ? Add : Offline}
          />
          <Route
            exact
            path="/trasferimento"
            component={isOnline ? Trasferimento : Offline}
          />
          <Route exact path="/transazione/:id" component={Transazione} />
          <Route exact path="/stats-mese:mese?" component={Stats} />
          <Route exact path="/stats-anno:anno?" component={StatsAnno} />
          <Route exact path="/spazi" component={Spazi} />
          <Route
            exact
            path="/spazi/new"
            component={isOnline ? AddSpazio : Offline}
          />
          <Route exact path="/spazio/:id" component={Spazio} />
          <Route exact path="/spazio/:id/setting" component={SettingSpazio} />
          <Route exact path="/profilo" component={Profilo} />
          <Route
            exact
            path="/profilo/new-metodo"
            component={isOnline ? AddMetodo : Offline}
          />
          <Route exact path="/profilo/debcred" component={DebCred} />
          <Route exact path="/profilo/debcred/:id" component={DebCred_id} />
          <Route exact path="/profilo/speseric" component={SpeseRic} />
          <Route exact path="/profilo/speseric/:id" component={SpeseRic_id} />
          <Route
            exact
            path={["/profilo/stats-utente", "/profilo/stats-utente/:user"]}
            component={StatsUtente}
          />

          <Route>
            <E404 />
            <Navbar />
          </Route>
        </Switch>
        <Route
          exact
          path="/add-:tipo/:Categoria?/:Soldi?/:Metodo?/:Motivo?/:Spazio?/:Appunti?"
        >
          <AddNew />
        </Route>
      </div>
    </Router>
  );
}

export default App;
