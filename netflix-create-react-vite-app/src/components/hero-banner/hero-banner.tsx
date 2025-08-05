import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton, BeehiveContainer } from './hero-banner.styles';
import { useTheme } from '../../context/themeContext';
import { winterTheme, autumnTheme, springTheme, summerTheme } from '../../styles/themes/themes';
import { renderSnow, renderLeaves, renderFlowers, renderButterflies, renderBees } from '../../utils/seasonal-effects';
import { Beehive } from '../svg/beehive';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  movieId: number;
  mediaType: 'movie' | 'tv';
}


export const renderSeasonalEffects = (theme: any) => {
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
  const [showInfo, setShowInfo] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/trailer/${mediaType}/${movieId}`);
  };

  

  return (
    <BannerContainer backgroundImage={backgroundImage}>
      {theme &&renderSeasonalEffects(theme)}
      <BannerOverlay>
        <div>
          <BannerTitle>{title}</BannerTitle>
          <BannerButtons>
            <BannerButton onClick={handlePlayClick}>Play</BannerButton>
            <BannerButton onClick={() => setShowInfo((v) => !v)}>
              {showInfo ? 'Less Info' : 'More Info'}
            </BannerButton>
          </BannerButtons>
        </div>
        {showInfo && <BannerOverview>{overview}</BannerOverview>}
      </BannerOverlay>
    </BannerContainer>
  );
};
