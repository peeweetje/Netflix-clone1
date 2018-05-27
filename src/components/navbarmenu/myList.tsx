import * as React from "react";
import NavbarHeader from "../navbarmenu/navbarHeader";

class MyList extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <NavbarHeader />
        <h1>MyList</h1>
      </div>
    );
  }
}

export default MyList;
