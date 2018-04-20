import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';

// interface Iprops {}
// interface Istate {}

class HomePage extends React.Component<{}, {}> {
  constructor (props: string) {
    super(props);
  }

    render() {
      return (
        <div>
          <NavbarHeader />
          <h1>Homepage</h1>
        </div>
      );
    }
  }

export default HomePage;