import * as React from "react";
import "../app/App.css";

interface IsearchProps {}

interface IsearchState {
  searchResults: Array<string>;
  searchUrl: string;
}

const API_KEY = process.env.REACT_APP_API_KEY;

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
    console.log(query);
}

handleKeyUp = (query: any) => {
  if (query === "Enter" && this.state.searchResults !== [""]) {
    let searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${this.state.searchResults} `;
    this.setState({
      searchUrl
    });

  }
  console.log(this.state.searchResults);
  // console.log(this.state.searchUrl);

}

  render() {
    return (
      <form id="Search" className="Search">
        <input onChange={this.handleChange} value={this.state.searchUrl} onKeyUp={this.handleKeyUp} type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
