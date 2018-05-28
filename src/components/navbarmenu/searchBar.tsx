import * as React from "react";
import "../navbarmenu/searchBar.css";

interface IsearchProps {}

interface IsearchState {
  searchResults: Array<string>;
}

class SearchBar extends React.Component< IsearchProps, IsearchState> {
  constructor(props: IsearchProps) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  handleChange = (e: any) => {
    const query = e.target.value;
    if (!query) {
        this.setState({searchResults: []});
        return;
  }
    console.log(e.target.value);
}

  render() {
    return (
      <form id="Search" className="Search">
        <input onChange={this.handleChange} type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
