import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton, BeehiveContainer } from './hero-banner.styles';
import { useTheme } from '../../context/themeContext';
import { winterTheme, autumnTheme, springTheme, summerTheme } from '../../styles/themes/themes';
import { renderSnow, renderLeaves, renderFlowers, renderButterflies, renderBees, renderSeasonalEffect } from '../../utils/seasonal-effects';
import { Beehive } from '../svg/beehive';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  movieId: number;
  mediaType: 'movie' | 'tv';
}


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

  const renderSeasonalEffect = () => {
    if (theme.name === winterTheme.name) return renderSnow();
    if (theme.name === autumnTheme.name && theme.colors.leafIcon)
      return renderLeaves();
    if (theme.name === springTheme.name && theme.colors.flowerIcon)
      return renderFlowers();
    if (theme.name === springTheme.name && theme.colors.butterflyIcon)
      return renderButterflies();
    if (theme.name === summerTheme.name)
      return (
        <>
          {renderBees()}
          <BeehiveContainer>
            <Beehive />
          </BeehiveContainer>
        </>
      );
    return null;
  };

  return (
    <BannerContainer backgroundImage={backgroundImage}>
      {renderSeasonalEffect()}
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
