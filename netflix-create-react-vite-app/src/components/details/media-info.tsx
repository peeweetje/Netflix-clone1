import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import {
  detailsStyles,
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
  const info = stylex.props(detailsStyles.infoText);
  const label = stylex.props(detailsStyles.infoLabel);

  return (
    <div {...stylex.props(detailsStyles.infoColumnsWrapper)} role="region" aria-labelledby="media-info-heading">
      <h2 id="media-info-heading" className="sr-only">
        {t('media-details', 'Media Details')}
      </h2>
      <div {...stylex.props(detailsStyles.infoColumn)} tabIndex={0} aria-label={t('media-details', 'Media Details')}>
        <p {...info}><span {...label}>{t('status', 'Status')}:</span>{' '}{media.status || t('not-available', 'N/A')}</p>
        <p {...info}><span {...label}>{t('original-language', 'Original Language')}:</span>{' '}{media.original_language || t('not-available', 'N/A')}</p>
        {type === 'movie' ? (
          <>
            <p {...info}><span {...label}>{t('release-date', 'Release Date')}:</span>{' '}{(media as MovieMedia).release_date || t('not-available', 'N/A')}</p>
            <p {...info}><span {...label}>{t('runtime', 'Runtime')}:</span>{' '}{(media as MovieMedia).runtime ? `${(media as MovieMedia).runtime} ${t('minutes', 'min')}` : t('not-available', 'N/A')}</p>
          </>
        ) : (
          <>
            <p {...info}><span {...label}>{t('first-air-date', 'First Air Date')}:</span>{' '}{(media as TVMedia).first_air_date || t('not-available', 'N/A')}</p>
            <p {...info}><span {...label}>{t('last-air-date', 'Last Air Date')}:</span>{' '}{(media as TVMedia).last_air_date || t('not-available', 'N/A')}</p>
            <p {...info}><span {...label}>{t('number-of-seasons', 'Number of Seasons')}:</span>{' '}{(media as TVMedia).number_of_seasons || t('not-available', 'N/A')}</p>
            <p {...info}><span {...label}>{t('number-of-episodes', 'Number of Episodes')}:</span>{' '}{(media as TVMedia).number_of_episodes || t('not-available', 'N/A')}</p>
          </>
        )}
        <p {...info}><span {...label}>{t('genres', 'Genres')}:</span>{' '}{media.genres?.map((g) => g.name).join(', ') || t('not-available', 'N/A')}</p>
        <p {...info}><span {...label}>{t('rating', 'Rating')}:</span>{' '}{media.vote_average ? `${media.vote_average.toFixed(1)} ${t('out-of-10', 'out of 10')}` : t('not-available', 'N/A')}</p>
        <p {...info}><span {...label}>{t('vote-count', 'Vote Count')}:</span>{' '}{media.vote_count ? media.vote_count.toLocaleString() : t('not-available', 'N/A')}</p>
      </div>
    </div>
  );
};
