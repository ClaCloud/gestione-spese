import React, { useEffect } from 'react';
import $ from 'jquery';

function Modale(props) {

  useEffect( async () =>  {
    var viewportX = window.innerWidth;
    var viewportY = window.innerHeight;

    $(window).on("resize", function () {
      viewportX = window.innerWidth;
      viewportY = window.innerHeight;
      $(".modale").each(function () {
        if ($(this).children(".modal-content").height() + 80 >= viewportY) {
          $(this).addClass("long");
        } else {
          $(this).removeClass("long");
        }
      });
    });

    $("#root").on("click", ".open-modal", function () {
      let questo = $(this).attr("data-modal") ? ".modale[data-modal=" + $(this).attr("data-modal") + "]" : ".modale";
      $(questo).addClass("open");
      if ($(questo).children(".modal-content").height() + 80 >= viewportY) {
        $(questo).addClass("long");
      } else {
        $(questo).removeClass("long");
      }
    });
    $("#root").on("click", ".close-modal", function () {
      let questo = $(this).attr("data-modal") ? ".modale[data-modal=" + $(this).attr("data-modal") + "]" : ".modale";
      $(questo).removeClass("open");
    });

    $(".modale").on("click", async function (e) {
      if (e.target === this) {
        $(this).removeClass("open");
      }
    })
  }, [])

  const dataModale = props.dataModale;
  const content = props.content;
  const className = props.className;

  return (
    <div className={`modale ${className}`} data-modal={dataModale}>
      <div className="modal-content">
        {content}
      </div>
    </div >
  )
}

export default Modale;
