import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../components/loading/loading';
import { useTheme } from '../../context/themeContext';
import { fetchVideos } from '../../utils/queries';
import {
  GoBackButton,
  TrailerContainer,
  VideoWrapper,
} from './trailer-page-styles';

export const TrailerPage = () => {
  const { t } = useTranslation();
  const { id, media_type } = useParams<{ id: string; media_type: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Fetch videos using TanStack Query with enhanced error handling
  const {
    data: videos = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['videos', media_type, id],
    queryFn: () => fetchVideos(media_type as 'movie' | 'tv', id || ''),
    enabled: !!(id && media_type),
    staleTime: 1000 * 60 * 10, // 10 minutes for video data
    retry: (failureCount, error) => {
      // Don't retry on specific video errors
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('videos not found') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('network error')
        ) {
          return false;
        }
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000), // Max 10 seconds
  });

  // Find trailer from videos data
  const trailer = videos.find(
    (vid: any) => vid?.type === 'Trailer' && vid?.site === 'YouTube'
  );

  const videoKey = trailer?.key || null;

  if (loading) {
    return (
      <TrailerContainer>
       <Loading/>
      </TrailerContainer>
    );
  }

  // Enhanced error message for better user experience
  const getErrorMessage = () => {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      if (message.includes('network error')) {
        return 'Unable to load trailer. Please check your internet connection.';
      }
      if (message.includes('videos not found')) {
        return 'Trailer not available for this content.';
      }
      if (message.includes('unauthorized')) {
        return 'Unable to access trailer. Please try again later.';
      }
      if (message.includes('server error')) {
        return 'Server error occurred. Please try again later.';
      }
      return 'Failed to load trailer. Please try again.';
    }
    return null; // Return null when there's no error
  };

  if (error) {
    return (
      <TrailerContainer>
        <p>{getErrorMessage()}</p>
        <GoBackButton onClick={() => navigate(-1)}>{t('go-back-button')}</GoBackButton>
      </TrailerContainer>
    );
  }

  return (
    <TrailerContainer>
      <GoBackButton onClick={() => navigate(-1)}>{t('go-back-button')}</GoBackButton>
      {videoKey ? (
        <VideoWrapper>
          <iframe
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            frameBorder='0'
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={t('movie-trailer')}
          />
        </VideoWrapper>
      ) : (
        <p>{t('no-trailer-found')}</p>
      )}
    </TrailerContainer>
  );
};
