import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Spinner } from '../../../components/spinner/spinner';
import { imageUrl, VITE_API_KEY } from '../../../utils/api';
import {
  StyledContainer,
  PosterImage,
  InfoColumnsWrapper,
  InfoColumn,
  CastSection,
  CastList,
  ImageColumn,
  InfoText,
  InfoLabel,
  TagLine,
  MainColumns,
  LeftColumn,
  RightColumn,
} from './movieDetails-styles';
import { CastMember } from './castMember';
import { MoviePoster } from './MoviePoster';

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

          <InfoColumnsWrapper>
            <InfoColumn>
              <InfoText>
                <InfoLabel>Status:</InfoLabel> {movie.status}
              </InfoText>
              <InfoText>
                <InfoLabel>Original Language:</InfoLabel>{' '}
                {movie.original_language}
              </InfoText>
              <InfoText>
                <InfoLabel>Release Date:</InfoLabel> {movie.release_date}
              </InfoText>
              <InfoText>
                <InfoLabel>Runtime:</InfoLabel> {movie.runtime} min
              </InfoText>
              <InfoText>
                <InfoLabel>Genres:</InfoLabel>{' '}
                {movie.genres?.map((g: any) => g.name).join(', ')}
              </InfoText>
              <InfoText>
                <InfoLabel>Rating:</InfoLabel> {movie.vote_average}
              </InfoText>
              <InfoText>
                <InfoLabel>Vote Count:</InfoLabel> {movie.vote_count}
              </InfoText>
            </InfoColumn>
            <InfoColumn>
              <InfoText>
                <InfoLabel>Budget:</InfoLabel> ${movie.budget?.toLocaleString()}
              </InfoText>
              <InfoText>
                <InfoLabel>Revenue:</InfoLabel> $
                {movie.revenue?.toLocaleString()}
              </InfoText>
              <InfoText>
                <InfoLabel>Production Companies:</InfoLabel>
                {movie.production_companies?.map((c: any) => c.name).join(', ')}
              </InfoText>
              <InfoText>
                <InfoLabel>Production Countries:</InfoLabel>
                {movie.production_countries?.map((c: any) => c.name).join(', ')}
              </InfoText>
              <InfoText>
                <InfoLabel>Homepage:</InfoLabel>
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {movie.homepage}
                  </a>
                )}
              </InfoText>
            </InfoColumn>
          </InfoColumnsWrapper>
        </RightColumn>
      </MainColumns>
    </StyledContainer>
  );
};
