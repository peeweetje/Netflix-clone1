import * as React from "react";
import NavbarHeader from "../navbarmenu/navbarheader/navbarHeader";
import { useEffect, useState } from "react";
import { ContentContainer } from "./homepage-styles";

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
    <>
      <NavbarHeader />
      {results &&
        results.length > 0 &&
        results.map((result: any) => (
          <ContentContainer key={result.id}>
            <ul>
              <img
                className="card-img"
                src={`${imageUrl}${result.poster_path}`}
                alt="movie-posters"
              />
            </ul>
          </ContentContainer>
        ))}
    </>
  );
};

export default Homepage;
