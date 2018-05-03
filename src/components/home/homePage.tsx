import * as React from "react";
import NavbarHeader from "../navbarmenu/navbarHeader";
import "../home/homePage.css";

interface IhomeProps {}

interface IhomeState {
  results: Array<{
    title: string;
    poster_path: string;
    id: number;
  }>;
}

const API_KEY = process.env.REACT_APP_API_KEY;
let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
let imageUrl = `https://image.tmdb.org/t/p/w200`;
console.log(baseUrl);
console.log(imageUrl);

class HomePage extends React.Component<IhomeProps, IhomeState> {
  constructor(props: IhomeProps) {
    super(props);
    this.state = {
      results: []
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
        {results &&
          results.map(result => (
            <div className="content" key={result.id}>
              <ul>
                <li>{result.title}</li>
                <img
                  src={`${imageUrl}${result.poster_path}`}
                  alt="movie-posters"
                />
              </ul>
            </div>
          ))}
      </div>
    );
  }
}

export default HomePage;
