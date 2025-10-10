import React from 'react';
import { useTranslation } from 'react-i18next';
import { PosterContainer, PosterImage, Tagline, Title } from './details-styles';

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
    <PosterContainer>
      <Title as="h1">{title}</Title>
      <PosterImage
        alt={t('movie-poster', { title })}
        src={`${imageUrl}${posterPath}`}
      />
      <Tagline aria-label={`${t('tagline', 'Tagline')}: ${tagline}`}>{tagline}</Tagline>
    </PosterContainer>
  );
};
