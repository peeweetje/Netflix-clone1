import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  InfoColumn,
  InfoColumnsWrapper,
  InfoLabel,
  InfoText,
} from './details-styles';
import type { Genre } from '../../utils/types/types';

interface MovieMedia {
  status: string;
  original_language: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
}

interface TVMedia {
  status: string;
  original_language: string;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  vote_average: number;
  vote_count: number;
}

interface MediaInfoProps {
  media: MovieMedia | TVMedia;
  type: 'movie' | 'tv';
}

export const MediaInfo = ({ media, type }: MediaInfoProps) => {
  const { t } = useTranslation();

  return (
    <InfoColumnsWrapper role="region" aria-labelledby="media-info-heading">
      <h2 id="media-info-heading" className="sr-only">
        {t('media-details', 'Media Details')}
      </h2>
      <InfoColumn tabIndex={0} aria-label={t('media-details', 'Media Details')}>
        <InfoText>
          <InfoLabel>{t('status', 'Status')}:</InfoLabel>{' '}
          {media.status || t('not-available', 'N/A')}
        </InfoText>
        <InfoText>
          <InfoLabel>{t('original-language', 'Original Language')}:</InfoLabel>{' '}
          {media.original_language || t('not-available', 'N/A')}
        </InfoText>
        {type === 'movie' ? (
          <>
            <InfoText>
              <InfoLabel>{t('release-date', 'Release Date')}:</InfoLabel>{' '}
              {media.release_date || t('not-available', 'N/A')}
            </InfoText>
            <InfoText>
              <InfoLabel>{t('runtime', 'Runtime')}:</InfoLabel>{' '}
              {media.runtime ? `${media.runtime} ${t('minutes', 'min')}` : t('not-available', 'N/A')}
            </InfoText>
          </>
        ) : (
          <>
            <InfoText>
              <InfoLabel>{t('first-air-date', 'First Air Date')}:</InfoLabel>{' '}
              {media.first_air_date || t('not-available', 'N/A')}
            </InfoText>
            <InfoText>
              <InfoLabel>{t('last-air-date', 'Last Air Date')}:</InfoLabel>{' '}
              {media.last_air_date || t('not-available', 'N/A')}
            </InfoText>
            <InfoText>
              <InfoLabel>{t('number-of-seasons', 'Number of Seasons')}:</InfoLabel>{' '}
              {media.number_of_seasons || t('not-available', 'N/A')}
            </InfoText>
            <InfoText>
              <InfoLabel>{t('number-of-episodes', 'Number of Episodes')}:</InfoLabel>{' '}
              {media.number_of_episodes || t('not-available', 'N/A')}
            </InfoText>
          </>
        )}
        <InfoText>
          <InfoLabel>{t('genres', 'Genres')}:</InfoLabel>{' '}
          {media.genres?.map((g) => g.name).join(', ') || t('not-available', 'N/A')}
        </InfoText>
        <InfoText>
          <InfoLabel>{t('rating', 'Rating')}:</InfoLabel>{' '}
          {media.vote_average ? `${media.vote_average.toFixed(1)} ${t('out-of-10', 'out of 10')}` : t('not-available', 'N/A')}
        </InfoText>
        <InfoText>
          <InfoLabel>{t('vote-count', 'Vote Count')}:</InfoLabel>{' '}
          {media.vote_count ? media.vote_count.toLocaleString() : t('not-available', 'N/A')}
        </InfoText>
      </InfoColumn>
    </InfoColumnsWrapper>
  );
};
