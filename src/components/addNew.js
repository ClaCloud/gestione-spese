import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function AddNew(props) {

  const [active, setActive] = useState(false);

  function activeAdd() {
    setActive(!active);
  }

  const classActive = active ? "clicked" : null;

  return (
    <div className="add-new">
      <div className="container">
        <div className={`clickme bgprimary ${classActive}`} onClick={activeAdd}>
          <i className="fas fa-plus"></i>
        </div>
        <div className="pulsanti">
          <NavLink to="/add-entrata" className="button inline bggreen" onClick={activeAdd}>
            <div className="row">
              <div className="col scritta">
                Entrata
                </div>
              <div className="col">
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </NavLink>
          <NavLink to="/add-spesa" className="button inline bgalert" onClick={activeAdd}>
            <div className="row">
              <div className="col scritta">
                Uscita
                </div>
              <div className="col">
                <i className="fas fa-minus"></i>
              </div>
            </div>
          </NavLink>
          <NavLink to="/trasferimento" className="button inline bgsecondary" onClick={activeAdd}>
            <div className="row">
              <div className="col scritta">
                Trasferimento
                </div>
              <div className="col">
                <i className="fas fa-sync-alt"></i>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="back" onClick={activeAdd}></div>
      </div>
    </div>
  );
}

export default AddNew;
