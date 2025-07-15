import React, { useState } from 'react';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton } from './hero-banner.styles';

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

  return (
    <BannerContainer backgroundImage={backgroundImage}>
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
