import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';

class HomePage extends React.Component<{}, {}> {
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