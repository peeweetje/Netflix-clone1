import * as React from "react";
import "../navbarmenu/searchBar.css";

interface IsearchProps {}

interface IsearchState {
  searchResults: Array<string>;
  searchUrl: string;
}

class SearchBar extends React.Component< IsearchProps, IsearchState> {
  constructor(props: IsearchProps) {
    super(props);
    this.state = {
      searchResults: [],
      searchUrl: ""
    };
  }

  handleChange = (e: any) => {
    const query = e.target.value;
    if (!query) {
        this.setState({searchResults: []});
        return;
  }
}

handleKeyUp = (query: any) => {
  if (query === "Enter" && this.state.searchResults !== [""]) {
    let searchUrl = `https://api.themoviedb.org/3/search/multi?query=${this.state.searchResults}&api_key=cf24f6039676d503f5763537eddf2fd3 `;
    this.setState({
      searchUrl
    });
  }
}

  render() {
    return (
      <form id="Search" className="Search">
        <input onChange={this.handleChange} onKeyUp={this.handleKeyUp} type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
