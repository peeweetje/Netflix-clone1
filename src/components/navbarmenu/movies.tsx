import * as React from "react";
import NavbarHeader from "../navbarmenu/navbarHeader";

class Movies extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <NavbarHeader />
        <h1>Movies</h1>
      </div>
    );
  }
}

export default Movies;
