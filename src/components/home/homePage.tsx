import * as React from "react";
import NavbarHeader from "../navbarmenu/navbarheader/navbarHeader";
import "../app/App.css";
import { useEffect, useState } from "react";

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

const Homepage: React.FC<IhomeState> = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setResults(data.results));
  }, []);

  return (
    <div className="container">
      <NavbarHeader />
      {results &&
        results.length > 0 &&
        results.map((result: any) => (
          <div className="content" key={result.id}>
            <ul>
              <img
                className="card-img"
                src={`${imageUrl}${result.poster_path}`}
                alt="movie-posters"
              />
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Homepage;
