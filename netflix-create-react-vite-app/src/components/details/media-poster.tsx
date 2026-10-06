import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { detailsStyles } from './details-styles';

interface MediaPosterProps {
  title: string;
  posterPath: string;
  tagline: string;
  imageUrl: string;
}

export const MediaPoster = ({
  title,
  posterPath,
  tagline,
  imageUrl,
}: MediaPosterProps) => {
  const { t } = useTranslation();

  return (
    <div {...stylex.props(detailsStyles.posterContainer)}>
      <h1 {...stylex.props(detailsStyles.title)}>{title}</h1>
      <img {...stylex.props(detailsStyles.posterImage)}
        alt={t('movie-poster', { title })}
        src={`${imageUrl}${posterPath}`}
      />
      <p {...stylex.props(detailsStyles.tagline)} aria-label={`${t('tagline', 'Tagline')}: ${tagline}`}>{tagline}</p>
    </div>
  );
};
