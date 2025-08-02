import React from 'react';
import {
  SnowContainer,
  Snow,
  LeafContainer,
  Leaf,
  FlowersThemeContainer,
  ButterflyContainer,
  AnimatedButterfly,
  BeesThemeContainer,
  BeehiveContainer,
  BeachballContainer,
} from '../components/hero-banner/hero-banner.styles';
import { LeafIcon } from '../components/svg/leafs';
import { FlowersTheme } from '../components/svg/flowers-theme';
import { Butterfly } from '../components/svg/butterfly';
import { Beehive } from '../components/svg/beehive';
import { useTheme } from '../context/themeContext';
import { Bee } from '../components/svg/bee';
import { AnimatedBee } from '../components/svg/bee.styles';


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
      {butterflyPositions.slice(0, 3).map((pos, i) => {
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        return (
          <AnimatedButterfly
            key={i}
            initial={{ x: pos.x, y: pos.y }}
            animate={{ 
              x: [`${parseFloat(pos.x)}%`, `${parseFloat(pos.x) + 50}%`, `${parseFloat(pos.x)}%`],
              y: [`${parseFloat(pos.y)}%`, `${parseFloat(pos.y) - 5}%`, `${parseFloat(pos.y)}%`],
              rotate: [0, 15, 0, -15, 0] 
            }}
            transition={{
              duration: duration * 2,
              delay: delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Butterfly
              primaryColor={['#9370DB', '#3CB371', '#FFD700'][i]}
              secondaryColor={['#8A2BE2', '#2E8B57', '#FFA500'][i]}
            />
          </AnimatedButterfly>
        );
      })}
    </ButterflyContainer>
  );
};

export const renderBees = () => {
  const beePositions = [
    { x: '85%', y: '20%' },
    { x: '80%', y: '30%' },
    { x: '75%', y: '40%' },
    { x: '82%', y: '50%' },
    { x: '78%', y: '25%' },
    { x: '72%', y: '35%' },
  ];

  const beehiveEntranceX = '92%'; // Adjusted X for beehive entrance
  const beehiveEntranceY = '12%'; // Adjusted Y for beehive entrance

  return (
  
    <BeesThemeContainer>
      {beePositions.map((pos, i) => {
        const delay = Math.random() * 5;
        const duration = Math.random() * 18 + 12;

        return (
          <AnimatedBee
            key={i}
            initial={{ x: beehiveEntranceX, y: beehiveEntranceY, opacity: 0, scale: 0.1 }}
            animate={{
              x: [
                beehiveEntranceX,
                `${parseFloat(beehiveEntranceX) + (Math.random() * 10 - 5)}%`,
                beehiveEntranceX,
              ],
              y: [
                beehiveEntranceY,
                `${parseFloat(beehiveEntranceY) + (Math.random() * 10 - 5)}%`,
                beehiveEntranceY,
              ],
              opacity: [0, 1, 1, 0],
              scale: [0.1, 1, 1, 0.1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: duration,
              delay: delay * i, // Staggered delay
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Bee />
          </AnimatedBee>
        );
      })}
    </BeesThemeContainer>
  );
};
