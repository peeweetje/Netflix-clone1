import * as React from 'react';
import NavbarHeader from '../navbarmenu/navbarHeader';
import '../home/homePage.css';

interface IhomeProps {}
interface IhomeState {
  results: Array<any>;
}

const API_KEY = process.env.REACT_APP_API_KEY;
let baseUrl = `https://api.themoviedb.org/3/movie/47933?api_key=${API_KEY}`;
console.log(baseUrl);

class HomePage extends React.Component<IhomeProps, IhomeState> {

  constructor(props: IhomeProps) {
    super(props);
    this.state = {
     results: [],
    };
  }

  componentDidMount() {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => this.setState({ results: data.results }));
  }

    render() {
      const { results } = this.state;
      return (
        <div>
          <NavbarHeader />
          {results.map(result =>
          <div className="results" key={result.objectID}>
            <a>{result.name}</a>
          </div>
        )}
        </div>
      );
    }
  }

export default HomePage;