import React, { useState } from 'react';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton, SnowContainer, Snow } from './hero-banner.styles';
import { useTheme } from '../../context/themeContext';
import { winterTheme } from '../../styles/themes/themes';

interface HeroBannerProps {
  backgroundImage: string;
  title: string;
  overview: string;
  onPlay?: () => void;
}


export const HeroBanner = ({
  backgroundImage,
  title,
  overview,
  onPlay,
}: HeroBannerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const { theme } = useTheme();

  const renderSnow = () => (
    <SnowContainer>
      {Array.from({ length: 50 }).map((_, i) => (
        <Snow key={i} />
      ))}
    </SnowContainer>
  );

  return (
    <BannerContainer backgroundImage={backgroundImage}>
      {theme.name === winterTheme.name && renderSnow()}
      <BannerOverlay>
        <div>
          <BannerTitle>{title}</BannerTitle>
          <BannerButtons>
            <BannerButton onClick={onPlay}>Play</BannerButton>
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
