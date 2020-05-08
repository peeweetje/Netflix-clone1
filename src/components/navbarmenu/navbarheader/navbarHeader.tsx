import * as React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../search-bar/searchBar";

import { useState } from "react";

export interface IsearchState {
  searchResults?: any;
  searchUrl?: string;
  searchQuery?: string;
}
const API_KEY = process.env.REACT_APP_API_KEY;

const NavbarHeader: React.FC<IsearchState> = () => {
  const [, setSearchResults] = useState("");
  const [, setSearchUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => {
    // tslint:disable-next-line: no-shadowed-variable
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);

    if (!searchQuery) {
      setSearchQuery(searchQuery);
      return;
    }
  };

  const handleKeyUp = () => {
    // tslint:disable-next-line: no-shadowed-variable
    let searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}`;
    setSearchUrl(searchUrl);
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results));
  };

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
        <SearchBar onChange={handleSearchChange} onKeyUp={handleKeyUp} />
      </nav>
    </div>
  );
};

export default NavbarHeader;
