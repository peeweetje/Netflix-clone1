import * as React from 'react';
// import { Link } from 'react-router-dom';
import '../navbarmenu/navbarHeader.css';

class NavbarHeader extends React.Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar-menu">
          <h1>BingeWatch</h1>
            <ul className="nav-list">
              <li>Homepagina</li>
              <li>Series</li>
              <li>Films</li>
              <li>Onlangs toegevoegd</li>
              <li>Mijn lijst</li>
            </ul>
          </nav>
          </div>
    );
  }
}

export default NavbarHeader;
