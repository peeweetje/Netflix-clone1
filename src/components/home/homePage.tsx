import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';

interface IhomeProps {}
interface IhomeState {
  hits: Array<any>;
}

const API = 'https://hn.algolia.com/api/v1/search?query=';

class HomePage extends React.Component<IhomeProps, IhomeState> {

  constructor (props: string) {
    super(props);
    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

    render() {
      const { hits } = this.state;
      return (
        <div>
          <NavbarHeader />
          {hits.map(hit =>
          <div key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </div>
        )}
        </div>
      );
    }
  }

export default HomePage;