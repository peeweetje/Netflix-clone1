import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../components/spinner/spinner';
import { imageUrl, VITE_API_KEY } from '../../../utils/api';
import {
  StyledContainer,
  CastSection,
  CastList,
  MainColumns,
  LeftColumn,
  RightColumn,
} from './movieDetails-styles';
import { CastMember } from './castMember';
import { MoviePoster } from './MoviePoster';
import { MovieInfo } from './movieInfo';

export const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchCast = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${VITE_API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch cast');
        const data = await response.json();
        setCast(data.cast || []);
      } catch (err) {
        // Optionally set error for cast
      }
    };
    fetchCast();
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
      <MainColumns>
        <LeftColumn>
        <MoviePoster 
          title={movie.title}
          posterPath={movie.poster_path}
          tagline={movie.tagline}
          imageUrl={imageUrl}
          />
        </LeftColumn>
        <RightColumn>
          {cast.length > 0 && (
            <CastSection>
              <h2>Cast Members</h2>
              <CastList>
                {cast.slice(0, 5).map((actor) => (
                  <CastMember
                    key={actor.cast_id || actor.credit_id}
                    actor={actor}
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : ""
                    }
                    alt={actor.name}
                  />
                ))}
              </CastList>
            </CastSection>
          )}
          <MovieInfo movie={movie} />
        </RightColumn>
      </MainColumns>
    </StyledContainer>
  );
};
