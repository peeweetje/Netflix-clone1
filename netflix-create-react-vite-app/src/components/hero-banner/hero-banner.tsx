import React, { useState } from 'react';
import { BannerContainer, BannerOverlay, BannerTitle, BannerOverview, BannerButtons, BannerButton, SnowContainer, Snow, LeafContainer, Leaf } from './hero-banner.styles';
import { useTheme } from '../../context/themeContext';
import { springTheme, winterTheme } from '../../styles/themes/themes';
import { LeafIcon } from '../svg/leafs';

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
        <Snow
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`, // 5 to 15 seconds
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </SnowContainer>
  );

  const renderLeaves = () => (
    <LeafContainer>
      {Array.from({ length: 50 }).map((_, i) => (
        <Leaf
          key={i}
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 10 + 5}s`, // 5 to 15 seconds
            animationDelay: `${Math.random() * 10}s`,
          }}
        >
          <LeafIcon color={theme.colors.primary} />
        </Leaf>
      ))}
    </LeafContainer>
  );

  return (
    <BannerContainer backgroundImage={backgroundImage}>
      {theme.name === winterTheme.name && renderSnow()}
      {theme.name === springTheme.name && theme.colors.leafIcon && renderLeaves()}
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
