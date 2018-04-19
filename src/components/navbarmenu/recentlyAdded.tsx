import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';

class RecentlyAdded extends React.Component<{}, {}> {
    render() {
      return (
        <div>
          <NavbarHeader />
          <h1> Onlangs Toegevoegd</h1>
        </div>
      );
    }
  }

export default  RecentlyAdded;