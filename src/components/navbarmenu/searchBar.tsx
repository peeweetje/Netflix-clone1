import * as React from "react";
import "../navbarmenu/searchBar.css";

class SearchBar extends React.Component {
  render() {
    return (
      <form id="Search" className="Search">
        <input  type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
