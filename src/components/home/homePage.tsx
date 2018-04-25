import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';
import '../home/homePage.css';

interface IhomeProps {}
interface IhomeState {
  hits: Array<any>;
}

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

class HomePage extends React.Component<IhomeProps, IhomeState> {

  constructor(props: IhomeProps) {
    super(props);
    this.state = {
      hits: [],
    };
  }

  componentDidMount() {
    fetch(API_KEY)
      .then(response => response.json())
      .then(data => this.setState({ hits: data.hits }));
  }

    render() {
      const { hits } = this.state;
      return (
        <div>
          <NavbarHeader />
          {hits.map(hit =>
          <div className="hits" key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </div>
        )}
        </div>
      );
    }
  }

export default HomePage;