import * as React from "react";
import { Link } from "react-router-dom";
// import SearchBar from "./searchBar";
import "../app/App.css";

export interface IsearchState {
  searchResults: any;
  searchUrl: string;
  searchQuery: string;
}
const API_KEY = process.env.REACT_APP_API_KEY;

class NavbarHeader extends React.Component<{}, IsearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchResults: "",
      searchUrl: "",
      searchQuery: ""
    };
  }

  handleSearchChange = (e: any) => {
    const searchQuery = e.target.value;
    this.setState({
      searchQuery
    });

    if (!searchQuery) {
      this.setState({ searchQuery: "" });
      return;
    }
  }

  handleKeyUp = () => {
    let searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${
      this.state.searchQuery
    }`;
    this.setState({
      searchUrl
    });
    fetch(searchUrl)
      .then(response => response.json())
      .then(searchResults => this.setState({ searchResults }));
    console.log(searchUrl);
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
          {/* <SearchBar onChange={this.handleSearchChange} onKeyUp={this.handleKeyUp} /> */}
        </nav>
      </div>
    );
  }
}

export default NavbarHeader;
