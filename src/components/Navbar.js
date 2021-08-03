import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <div id="navbar">
      <div className="menu">

        <NavLink to="/home" activeClassName="active">
          <i className="fas fa-home"></i><span>Home</span>
        </NavLink>

        <NavLink to="/spazi" activeClassName="active">
          <i className="fas fa-folder"></i><span>Spazi</span>
        </NavLink>

        <NavLink to="/stats-mese" isActive={() => pathname.includes('/stats')}>
          <i className="fas fa-chart-pie"></i><span>Stats</span>
        </NavLink>

        <NavLink to="/profilo" activeClassName="active">
          <i className="fas fa-user"></i><span>Profilo</span>
        </NavLink>

      </div>
    </div>
  );
}

export default Navbar;
