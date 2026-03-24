import { Loading } from '../../components/loading/loading';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueries } from '@tanstack/react-query';
import { imageUrl } from '../../utils/api';
import { mediaQueries } from '../../utils/queries';
import { useTranslatedRoutes } from '../../utils/routes';
import { CastMember } from './cast-member';
import {
  ButtonContainer,
  CastList,
  CastSection,
  GoBackButton,
  LeftColumn,
  MainColumns,
  RightColumn,
  StyledContainer,
} from './details-styles';
import { MediaInfo } from './media-info';
import { MediaPoster } from './media-poster';
import { MediaDetails, MovieMedia, TVMedia } from '../../utils/types/types';

interface MediaDetailProps {
  type: 'movie' | 'tv';
}

// Helper function to convert MediaDetails to the correct MediaInfo type
const convertToMediaInfoData = (media: MediaDetails, type: 'movie' | 'tv'): MovieMedia | TVMedia => {
  if (type === 'movie') {
    return {
      status: media.status,
      original_language: media.original_language,
      release_date: media.release_date || '',
      runtime: media.runtime || 0,
      genres: media.genres,
      vote_average: media.vote_average,
      vote_count: media.vote_count,
    };
  } else {
    return {
      status: media.status,
      original_language: media.original_language,
      first_air_date: media.first_air_date || '',
      last_air_date: media.last_air_date || '',
      number_of_seasons: media.number_of_seasons || 0,
      number_of_episodes: media.number_of_episodes || 0,
      genres: media.genres,
      vote_average: media.vote_average,
      vote_count: media.vote_count,
    };
  }
};

export const MediaDetail = ({ type }: MediaDetailProps) => {
  const { t } = useTranslation();
  const routes = useTranslatedRoutes();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use TanStack Query for multiple API calls with enhanced error handling
  const [
    { data: media, isLoading: mediaLoading, error: mediaError },
    { data: cast = [], isLoading: castLoading },
    { data: videos = [], isLoading: videosLoading },
  ] = useQueries({
    queries: [
      mediaQueries.details(type, id || ''),
      mediaQueries.cast(type, id || ''),
      mediaQueries.videos(type, id || ''),
    ],
  });

  const loading = mediaLoading || castLoading || videosLoading;

  // Enhanced error handling for multiple queries
  // Only gate page-level error on media details
  const getErrorMessage = () => {
    if (mediaError instanceof Error) {
      return mediaError.message.toLowerCase().includes('not found')
        ? `${type === 'movie' ? 'Movie' : 'TV Show'} not found.`
        : `Failed to load ${type} details.`;
    }
    return null;
  };

  const error = getErrorMessage();

  // Check if media has trailer
  const hasTrailer = videos.some(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <Loading loading={loading} error={error}>
      {media && (
        <main>
          <StyledContainer>
            <ButtonContainer>
              <GoBackButton
                onClick={() => navigate(-1)}
                aria-label={t('go-back-button')}
              >
                {t('go-back-button')}
              </GoBackButton>
              {hasTrailer && (
                <GoBackButton
                  onClick={() => navigate(routes.getTrailer(type, media.id))}
                  aria-label={t('watch-trailer')}
                >
                 {t('watch-trailer')}
                </GoBackButton>
              )}
            </ButtonContainer>
            <MainColumns>
              <LeftColumn>
                <MediaPoster
                  imageUrl={imageUrl}
                  posterPath={media.poster_path || ''}
                  tagline={media.tagline || ''}
                  title={media.title || media.name || ''}
                />
              </LeftColumn>
              <RightColumn>
                {cast.length > 0 && (
                  <CastSection>
                    <h2>{t('cast-members', 'Cast Members')}</h2>
                    <CastList role="list" aria-label={t('cast-members', 'Cast Members')}>
                      {cast.slice(0, 5).map((actor) => (
                        <CastMember
                          actor={actor}
                          alt={actor.name}
                          key={actor.cast_id || actor.credit_id}
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : ''
                          }
                        />
                      ))}
                    </CastList>
                  </CastSection>
                )}
                <MediaInfo media={convertToMediaInfoData(media, type)} type={type} />
              </RightColumn>
            </MainColumns>
          </StyledContainer>
        </main>
      )}
    </Loading>
  );
};
