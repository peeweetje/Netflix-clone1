import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
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
import {
  BannerButton,
  BannerButtons,
  BannerContainer,
  BannerOverlay,
  BannerOverview,
  BannerTitle,
  BeehiveContainer,
} from './hero-banner.styles';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  movieId: number;
  mediaType: 'movie' | 'tv';
}

export const renderSeasonalEffects = (theme) => {
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
          {theme.icons?.butterflyIcon && renderButterflies(theme)}
        </>
      );
    case summerTheme.name:
      return (
        <>
          {renderBees()}
          <BeehiveContainer>
            <Beehive />
          </BeehiveContainer>
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
    <BannerContainer $backgroundImage={backgroundImage}>
      {theme && renderSeasonalEffects(theme)}
      <BannerOverlay>
        <div>
          <BannerTitle>{title}</BannerTitle>
          <BannerButtons>
            <BannerButton onClick={handlePlayClick}>Play</BannerButton>
            <BannerButton onClick={() => setShowInfo((v) => !v)}>
              {showInfo ? t('less-info') : t('more-info')}
            </BannerButton>
          </BannerButtons>
        </div>
        {showInfo && <BannerOverview>{overview}</BannerOverview>}
      </BannerOverlay>
    </BannerContainer>
  );
};
