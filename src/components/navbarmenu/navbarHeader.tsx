import * as React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchBar";
import "../navbarmenu/navbarHeader.css";

class NavbarHeader extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar-menu">
          <Link to="/">
            <h1>BingeWatch</h1>
          </Link>
          <ul className="nav-list">
            <Link to="/">
              <li>Homepagina</li>
            </Link>
            <Link to="/shows">
              <li>Series</li>
            </Link>
            <Link to="/Movies">
              <li>Films</li>
            </Link>
            <Link to="/RecentlyAdded">
              <li>Onlangs toegevoegd</li>
            </Link>
            <Link to="/MyList">
              <li>Mijn lijst</li>
            </Link>
          </ul>
          <SearchBar />
        </nav>
      </div>
    );
  }
}

export default NavbarHeader;
