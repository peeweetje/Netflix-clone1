import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton } from './hero-banner.styles';
import { useTheme } from '../../context/themeContext';
import { winterTheme, autumnTheme, springTheme } from '../../styles/themes/themes';
import { renderSnow, renderLeaves, renderFlowers, renderButterflies } from '../../utils/seasonal-effects';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  onPlay?: () => void;
  movieId: number;
}


export const HeroBanner = ({
  backgroundImage,
  title,
  overview,
  movieId,
}: HeroBannerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handlePlayClick = () => {
    navigate(`/trailer/${movieId}`);
  };

  return (
    <BannerContainer backgroundImage={backgroundImage}>
      {theme.name === winterTheme.name && renderSnow()}
      {theme.name === autumnTheme.name && theme.colors.leafIcon && renderLeaves()}
      {theme.name === springTheme.name && theme.colors.flowerIcon && renderFlowers()}
      {theme.name === springTheme.name && theme.colors.butterflyIcon && renderButterflies()}
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
