import * as React from "react";

class SearchBar extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <form id="Search" className="Search">
        <input type="search" placeholder="Search for a title..." />
      </form>
    );
  }
}

export default SearchBar;
