import * as React from 'react';
import { Link } from 'react-router-dom';
import '../navbarmenu/navbarHeader.css';

class NavbarHeader extends React.Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar-menu">
      <Link to="/HomePage"><h1>BingeWatch</h1></Link>
            <ul className="nav-list">
             <Link to="/HomePage"><li>Homepagina</li></Link>
             <Link to="/shows"><li>Series</li></Link>
             <Link to="/Movies"><li>Films</li></Link>
             <Link to="/RecentlyAdded"><li>Onlangs toegevoegd</li></Link>
             <Link to="/MyList"><li>Mijn lijst</li></Link>
            </ul>
          </nav>
          </div>
    );
  }
}

export default NavbarHeader;
