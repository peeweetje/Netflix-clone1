import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from '../spinner/spinner';
import { movieVideosUrl, showVideosUrl, VITE_API_KEY, imageUrl } from '../../utils/api';
import {
  StyledContainer,
  CastSection,
  CastList,
  MainColumns,
  LeftColumn,
  RightColumn,
  GoBackButton,
  ButtonContainer,
} from './details-styles';
import { CastMember } from './cast-member';
import { MediaPoster } from './media-poster';
import { MediaInfo } from './media-info';

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
  const [hasTrailer, setHasTrailer] = useState(false);

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

  useEffect(() => {
    if (id) {
      const checkTrailer = async () => {
        try {
          const url = type === 'movie' ? movieVideosUrl(Number(id)) : showVideosUrl(Number(id));
          const response = await fetch(url);
          const data = await response.json();
          const trailer = data.results.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
          setHasTrailer(!!trailer);
        } catch (error) {
          console.error(`Failed to fetch ${type} videos:`, error);
        }
      };
      checkTrailer();
    }
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
      <ButtonContainer>
        <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
        {hasTrailer && (
          <GoBackButton
            onClick={() => navigate(`/trailer/${type}/${media.id}`)}
          >
           Watch Trailer
          </GoBackButton>
        )}
      </ButtonContainer>
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
                        : ''
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