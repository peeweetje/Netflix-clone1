import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../components/spinner/spinner';
import { imageUrl, VITE_API_KEY } from '../../utils/api';

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const PosterImage = styled.img`
  width: 300px;
  border-radius: 8px;
`;

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${VITE_API_KEY}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading)
    return (
      <div>
        <Spinner />
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  if (!movie) return null;

  return (
    <StyledContainer>
      <h1>{movie.title}</h1>
      <PosterImage alt={movie.title} src={`${imageUrl}${movie.poster_path}`} />
      <p>
        <strong>Tagline:</strong> {movie.tagline}
      </p>
      <p>
        <strong>Status:</strong> {movie.status}
      </p>
      <p>
        <strong>Original Language:</strong> {movie.original_language}
      </p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Runtime:</strong> {movie.runtime} min
      </p>
      <p>
        <strong>Genres:</strong>{' '}
        {movie.genres?.map((g: any) => g.name).join(', ')}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
      <p>
        <strong>Vote Count:</strong> {movie.vote_count}
      </p>
      <p>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p>
        <strong>Budget:</strong> ${movie.budget?.toLocaleString()}
      </p>
      <p>
        <strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}
      </p>
      <p>
        <strong>Production Companies:</strong>{' '}
        {movie.production_companies?.map((c: any) => c.name).join(', ')}
      </p>
      <p>
        <strong>Production Countries:</strong>{' '}
        {movie.production_countries?.map((c: any) => c.name).join(', ')}
      </p>
      <p>
        <strong>Homepage:</strong>{' '}
        {movie.homepage && (
          <a href={movie.homepage} target='_blank' rel='noopener noreferrer'>
            {movie.homepage}
          </a>
        )}
      </p>
    </StyledContainer>
  );
};
