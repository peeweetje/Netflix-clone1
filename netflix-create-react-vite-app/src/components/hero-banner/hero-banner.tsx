import React,  { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import type { AppTheme } from '../../styles/themes/theme.types';
import {
  autumnTheme,
  springTheme,
  summerTheme,
  winterTheme,
} from '../../styles/themes/themes';
import {
  renderBees,
  renderButterflies,
  renderFlowers,
  renderLeaves,
  renderSnow,
} from '../../utils/seasonal-effects';
import { Beehive } from '../svg/beehive';
import { heroStyles } from './hero-banner.styles';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  movieId: number;
  mediaType: 'movie' | 'tv';
}

export const renderSeasonalEffects = (theme: AppTheme | null) => {
  if (!theme) return null;

  switch (theme.name) {
    case winterTheme.name:
      return renderSnow();
    case autumnTheme.name:
      return theme.icons?.leafIcon ? renderLeaves(theme) : null;
    case springTheme.name:
      return (
        <>
          {theme.icons?.flowerIcon && renderFlowers(theme)}
          {theme.icons?.butterflyIcon && renderButterflies()}
        </>
      );
    case summerTheme.name:
      return (
        <>
          {renderBees()}
          <div {...stylex.props(heroStyles.beehiveContainer)}>
            <Beehive />
          </div>
        </>
      );
    default:
      return null;
  }
};

export const HeroBanner = ({
  backgroundImage,
  title,
  overview,
  movieId,
  mediaType,
}: HeroBannerProps) => {
  const { t } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/trailer/${mediaType}/${movieId}`);
  };

  return (
    <section
      {...stylex.props(heroStyles.banner)}
      style={{ '--banner-image': `url(${backgroundImage})` } as React.CSSProperties}
    >
      {theme && renderSeasonalEffects(theme)}
      <div {...stylex.props(heroStyles.overlay)}>
        <div>
          <h1 {...stylex.props(heroStyles.title)} id="movie-title">{title}</h1>
          <div {...stylex.props(heroStyles.buttons)}>
            <button {...stylex.props(heroStyles.button)}
              onClick={handlePlayClick}
              aria-label={`${t('watch-trailer', 'Watch Trailer')} ${t('for', 'for')} ${title}`}
            >
              Play
            </button>
            <button {...stylex.props(heroStyles.button)}
              onClick={() => setShowInfo((v) => !v)}
              aria-expanded={showInfo}
              aria-controls="movie-overview"
              aria-describedby="movie-title"
            >
              {showInfo ? t('less-info') : t('more-info')}
            </button>
          </div>
        </div>
        {showInfo && (
          <p {...stylex.props(heroStyles.overview)} id="movie-overview">
            {overview || t('no-info-available')}
          </p>
        )}
      </div>
    </section>
  );
};
