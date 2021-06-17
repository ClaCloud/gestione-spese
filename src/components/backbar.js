import React from 'react';

function backBar(props) {

  const text = props.text;

  function goBack() {
    window.history.back();
  }

  return (
    <div className="back-bar">
        <div className="container">
          <a onClick={goBack}>
            <i className="fas fa-chevron-left"></i>
            <span>indietro</span>
          </a>
          <span>
            {text}
          </span>
        </div>
      </div>
  )
}

export default backBar;
