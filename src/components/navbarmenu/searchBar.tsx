import * as React from "react";
import "../app/App.css";

interface IsearchProps {}

interface IsearchState {
  searchResults: Array<string>;
  searchUrl: string;
  query: string;
}

const API_KEY = process.env.REACT_APP_API_KEY;

class SearchBar extends React.Component< IsearchProps, IsearchState> {
  constructor(props: IsearchProps) {
    super(props);
    this.state = {
      searchResults: [],
      searchUrl: "",
      query: ""
    };
  }

  handleSearchChange = (e: any) => {
    const query = e.target.value;
    this.setState({
      query
    });

    if (!query) {
        this.setState({searchResults: []});
        return;
  }
}

handleKeyUp = (query: any) => {
   if (query === "Enter" && this.state.searchResults !== [""]) {
    let searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${this.state.query}`;
    console.log("the searchurl is: ", searchUrl);
    this.setState({
      searchUrl
    });
    fetch(this.state.searchUrl)
    .then(response => console.log(response));
    // .then(data => this.setState({ searchResults: data.searchResults }));
   }
}

  render() {
    return (
      <form id="Search" className="Search">
        <input onChange={this.handleSearchChange} value={this.state.query} onKeyUp={this.handleKeyUp} type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
