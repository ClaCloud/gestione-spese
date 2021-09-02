import React, { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import $, { jQuery } from 'jquery';

export function Text(props) {
  const thin = props.thin ? "thin " : '';
  const id = props.id;
  const nome = props.nome;
  const required = props.required ?? false;

  const data = props.data;
  return (
    <label htmlFor={id} className={thin + props.className}>
      <input type="text" id={id} name={id} placeholder=" " maxLength="30" defaultValue={data} required={required} />
      <span className="placeholder">{nome}</span>
    </label>
  )
}

export function Select(props) {

  const changeICO = (event, lato) => {
    var index = event.target.selectedIndex;
    var optionElement = event.target.childNodes[index];

    var img = optionElement.getAttribute('img');
    var color = optionElement.getAttribute('color');

    var ico = '#icona-'.concat(event.target.name);
    if (lato != undefined) {
      if (lato == "left") {
        $(ico).css({ 'margin-left': '10px' });
      } else {
        $(ico).css({ 'margin-right': '10px' });
      }
    }
    if (event.target.value == 'NULL') {
      $(ico).animate({
        'margin': '0px'
      }).removeClass('open');
    } else {
      $(ico).css(
        'background-color', color
      ).addClass('open');
    }
    $(ico + ' img').attr('src', img);
  }

  const id = props.id,
    thin = props.thin ? "select-wrap thin" : "select-wrap",
    required = props.required ?? false,
    className = thin +" "+ props.class,
    nome = props.nome;

  return (
    <label htmlFor={id} className={className}>
      <select id={id} name={id} required={required} onChange={(event) => changeICO(event)}>
        {props.children}
      </select>
      <span className="placeholder">{nome}</span>
    </label >
  )
}

export function Option(props) {

  const value = props.value,
    name = props.name,
    img = props.img,
    color = props.color,
    label = props.label,
    selected = props.selected == label ? true : false;

  return (
    <option value={value} img={img} color={color} selected={selected} name={name} >{label}</option>
  )
}

export function Soldi(props) {

  useEffect(() => {
    $.fn.textWidth = function (text, font) {

      if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);

      $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css('font', font || this.css('font'));

      return $.fn.textWidth.fakeEl.width();
    };

    function inputWidth(elem, minW, maxW) {
      elem = $(this);
    }

    $('.width-dynamic').on('input change click ', function () {
      var inputWidth = $(this).textWidth();
      $(this).css({
        width: inputWidth
      })
    }).trigger('input');

    var targetElem = $('.width-dynamic');

    inputWidth(targetElem);

    $.fn.inputFilter = function (inputFilter) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    };
    $(".numeric").inputFilter(function (value) {
      return /^-?\d*[.,]?\d{0,2}$/.test(value);
    });
  }, [])

  const required = props.required ?? false;
  const data = props.data;
  return (
    <label htmlFor="prezzo">
      € <input type="text" className="width-dynamic numeric" name="prezzo" placeholder="0" maxLength="10" inputMode="decimal" defaultValue={data} required={required} />
    </label>
  )
}

export function Data(props) {
  const thin = props.thin ? "thin" : null;
  const id = props.id;
  const nome = props.nome;
  const required = props.required ?? false;
  const className = thin +" "+ props.class;

  const [data, setData] = useState(Date());

  useEffect(() => {
    setData(props.data);
  }, [props]);
  return (
    <label htmlFor={id} className={className} >
      <input type="date" name={id} placeholder="yyyy-mm-dd" value={dateFormat(data, "yyyy-mm-dd")} onChange={(event) => setData(event.target.value)} required={required} />
      <span className="placeholder">{nome}</span>
    </label>
  )
}

export function TextArea(props) {
  const thin = props.thin ? "thin" : null;
  const id = props.id;
  const nome = props.nome;
  const required = props.required ?? false;

  const data = props.data;
  return (
    <label htmlFor={id} className={thin}>
      <textarea name={id} rows="5" cols="80" maxLength="255" placeholder=" " defaultValue={data} required={required}></textarea>
      <span className="placeholder">Appunti</span>
    </label>
  )
}

export function Checkbox(props) {

  return (
    <label>

    </label>
  )
}

export function Switch(props) {

  return (
    <label>

    </label>
  )
}

export function Upload(props) {

  return (
    <label>

    </label>
  )
}
