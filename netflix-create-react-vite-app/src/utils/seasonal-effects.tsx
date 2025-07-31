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
        initial={{ y: '-100vh', x: `${Math.random() * 100}vw`, opacity: 1 }}
        animate={{ y: '100vh', rotate: 360 }}
        transition={{
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 10,
          repeat: Infinity,
          ease: 'linear',
        }}
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
                initial={{ 
                    y: '-10vh', 
                    x: `${Math.random() * 100}vw`, 
                    opacity: 0 
                }}
                animate={{
                    y: '100vh',
                    x: `${Math.random() * 200 - 100}vw`,
                    rotate: 720,
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: Math.random() * 10 + 5,
                    delay: Math.random() * 10,
                    repeat: Infinity,
                    ease: 'linear',
                }}
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

export const renderButterflies = () => {
  const butterflyPositions = [
    { x: '0%', y: '20%' },
    { x: '10%', y: '30%' },
    { x: '20%', y: '40%' },
  ];

  return (
    <ButterflyContainer>
      {butterflyPositions.map((pos, i) => {
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        return (
          <AnimatedButterfly
            key={i}
            initial={{ x: pos.x, y: pos.y }}
            animate={{ 
              x: [`${parseFloat(pos.x)}%`, `${parseFloat(pos.x) + 5}%`, `${parseFloat(pos.x)}%`],
              y: [`${parseFloat(pos.y)}%`, `${parseFloat(pos.y) - 5}%`, `${parseFloat(pos.y)}%`],
              rotate: [0, 15, 0, -15, 0] 
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Butterfly
              primaryColor={['#9370DB', '#3CB371', '#FFD700', '#FF69B4', '#1E90FF'][i]}
              secondaryColor={['#8A2BE2', '#2E8B57', '#FFA500', '#FF1493', '#4169E1'][i]}
            />
          </AnimatedButterfly>
        );
      })}
    </ButterflyContainer>
  );
};
