import * as React from 'react';
// import { Link } from 'react-router-dom';
import '../navbarmenu/navbarHeader.css';

class NavbarHeader extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BingeWatch</h1>

          <div>
          <nav>
            <ul className="nav-list">
              <li>Homepagina</li>
              <li>Series</li>
              <li>Films</li>
              <li>Onlangs toegevoegd</li>
              <li>Mijn lijst</li>
            </ul>
          </nav>
          </div>
          </header>
      </div>
    );
  }
}

export default NavbarHeader;
