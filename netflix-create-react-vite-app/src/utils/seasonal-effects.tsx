import React from 'react';
import {
  SnowContainer,
  Snow,
  LeafContainer,
  Leaf,
  FlowersThemeContainer,
  ButterflyContainer,
  AnimatedButterfly,
} from '../components/hero-banner/hero-banner.styles';
import { LeafIcon } from '../components/svg/leafs';
import { FlowersTheme } from '../components/svg/flowers-theme';
import { Butterfly } from '../components/svg/butterfly';
import { useTheme } from '../context/themeContext';

export const renderSnow = () => (
  <SnowContainer>
    {Array.from({ length: 50 }).map((_, i) => (
      <Snow
        key={i}
        left={`${Math.random() * 100}%`}
        animationDuration={`${Math.random() * 10 + 5}s`}
        animationDelay={`${Math.random() * 10}s`}
      />
    ))}
  </SnowContainer>
);

export const renderLeaves = () => {
    const { theme } = useTheme();
    return (
        <LeafContainer>
        {Array.from({ length: 20 }).map((_, i) => (
            <Leaf
                key={i}
                left={`${Math.random() * 100}%`}
                animationDuration={`${Math.random() * 10 + 5}s`}
                animationDelay={`${Math.random() * 10}s`}
                xStart={Math.random() * 200 - 100}
                xEnd={Math.random() * 200 - 100}
            >
            <LeafIcon
                color={
                [theme.colors.primary, '#C91E0A', '#e8b83d ', '#8B9216'][i % 3]
                }
                width='20'
                height='20'
            />
            </Leaf>
        ))}
        </LeafContainer>
    );
};

export const renderFlowers = () => (
  <FlowersThemeContainer>
    <FlowersTheme />
  </FlowersThemeContainer>
);

export const renderButterflies = () => (
  <ButterflyContainer>
    {Array.from({ length: 3 }).map((_, i) => (
      <AnimatedButterfly
        key={i}
        left={`${Math.random() * 100}%`}
        top={`${Math.random() * 100}%`}
        animationDuration={`${Math.random() * 3 + 4}s`}
        animationDelay={`${Math.random() * 5}s`}
      >
        <Butterfly
          primaryColor={['#9370DB', '#3CB371', '#FFD700'][i]}
          secondaryColor={['#8A2BE2', '#2E8B57', '#FFA500'][i]}
        />
      </AnimatedButterfly>
    ))}
  </ButterflyContainer>
);
