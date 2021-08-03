import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function StatNav() {

  return (
    <div id="statNav">
      <div className="menu">

        <NavLink to="/stats-mese" activeClassName="active">
         <span>Mese</span>
        </NavLink>

        <NavLink to="/stats-anno" activeClassName="active">
          <span>Anno</span>
        </NavLink>

        <span className="backLayer"></span>

      </div>
    </div>
  );
}

export default StatNav;
