import * as React from "react";
import "../app/App.css";

export interface IsearchProps {
  handleSearchChange: any;
  searchQuery: string;
  handleKeyUp: any;
}

/* interface IsearchState {
  searchResults: any;
  searchUrl: string;
  searchQuery: string;
 }*/

// const API_KEY = process.env.REACT_APP_API_KEY;

class SearchBar extends React.Component<IsearchProps, {}> {
  constructor(props: IsearchProps) {
    super(props);

  }

  /*handleSearchChange = (e: any) => {
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
  }*/

  render() {
    return (
      <form id="Search" className="Search">
        <input
          onChange={this.props.handleSearchChange}
          value={this.props.searchQuery}
          onKeyUp={this.props.handleKeyUp}
          type="search"
          placeholder="Search for a title..."
        />
      </form>
    );
  }
}

export default SearchBar;
