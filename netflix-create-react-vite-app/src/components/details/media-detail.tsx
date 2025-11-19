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
  const { t } = useTranslation();
  const routes = useTranslatedRoutes();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use TanStack Query for multiple API calls with enhanced error handling
  const [
    { data: media, isLoading: mediaLoading, error: mediaError },
    { data: cast = [], isLoading: castLoading, error: castError },
    { data: videos = [], isLoading: videosLoading, error: videosError },
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
                  posterPath={media.poster_path}
                  tagline={media.tagline}
                  title={media.title || media.name}
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
                <MediaInfo media={media} type={type} />
              </RightColumn>
            </MainColumns>
          </StyledContainer>
        </main>
      )}
    </Loading>
  );
};
