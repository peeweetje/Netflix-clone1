import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../spinner/spinner';
import { imageUrl, VITE_API_KEY } from '../../utils/api';
import {
  StyledContainer,
  CastSection,
  CastList,
  MainColumns,
  LeftColumn,
  RightColumn,
  GoBackButton,
} from './details-styles';
import { CastMember } from './castMember';
import { MediaPoster } from './MediaPoster';
import { MediaInfo } from './MediaInfo';

interface MediaDetailProps {
  type: 'movie' | 'tv';
}

interface MediaData {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  tagline?: string;
 
}

interface CastMember {
  cast_id?: number;
  credit_id: string;
  name: string;
  profile_path?: string;
  character?: string;
}


export const MediaDetail = ({ type }: MediaDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}?api_key=${VITE_API_KEY}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMedia(data);
      } catch (err) {
        setError(`Failed to fetch ${type} details. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [id, type]);

  useEffect(() => {
    const fetchCast = async () => {
      if (!id) return;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${VITE_API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch cast');
        const data = await response.json();
        setCast(data.cast || []);
      } catch (err) {
         console.error('Failed to fetch cast data:', err);
        setError('Failed to fetch cast data');
        setLoading(false);
      }
    };
    fetchCast();
  }, [id, type]);

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
  if (!media) return null;

  return (
    <StyledContainer>
      <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
      <MainColumns>
        <LeftColumn>
        <MediaPoster
          title={media.title || media.name}
          posterPath={media.poster_path}
          tagline={media.tagline}
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
          <MediaInfo media={media} type={type} />
        </RightColumn>
      </MainColumns>
    </StyledContainer>
  );
};