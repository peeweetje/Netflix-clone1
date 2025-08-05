import React from 'react';
import {
  AnimatedButterfly,
  BeachballContainer,
  BeehiveContainer,
  BeesThemeContainer,
  ButterflyContainer,
  FlowersThemeContainer,
  Leaf,
  LeafContainer,
  Snow,
  SnowContainer,
} from '../components/hero-banner/hero-banner.styles';
import { Bee } from '../components/svg/bee';
import { AnimatedBee } from '../components/svg/bee.styles';
import { Beehive } from '../components/svg/beehive';
import { Butterfly } from '../components/svg/butterfly';
import { FlowersTheme } from '../components/svg/flowers-theme';
import { LeafIcon } from '../components/svg/leafs';

export const renderSnow = () => (
  <SnowContainer>
    {Array.from({ length: 50 }).map((_, i) => (
      <Snow
        animate={{ y: '100vh', rotate: 360 }}
        initial={{ y: '-100vh', x: `${Math.random() * 100}vw`, opacity: 1 }}
        key={i}
        transition={{
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
    ))}
  </SnowContainer>
);

export const renderLeaves = (theme) => {
  return (
    <LeafContainer>
      {Array.from({ length: 20 }).map((_, i) => (
        <Leaf
          animate={{
            y: '100vh',
            x: `${Math.random() * 200 - 100}vw`,
            rotate: 720,
            opacity: [0, 1, 0],
          }}
          initial={{
            y: '-10vh',
            x: `${Math.random() * 100}vw`,
            opacity: 0,
          }}
          key={i}
          transition={{
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
        >
          <LeafIcon
            color={
              [theme.colors.primary, '#C91E0A', '#e8b83d ', '#8B9216'][i % 3]
            }
            height="20"
            width="20"
          />
        </Leaf>
      ))}
    </LeafContainer>
  );
};

export const renderFlowers = (theme) => (
  <FlowersThemeContainer>
    <FlowersTheme />
  </FlowersThemeContainer>
);

export const renderButterflies = (theme) => {
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
            animate={{
              x: [
                `${Number.parseFloat(pos.x)}%`,
                `${Number.parseFloat(pos.x) + 50}%`,
                `${Number.parseFloat(pos.x)}%`,
              ],
              y: [
                `${Number.parseFloat(pos.y)}%`,
                `${Number.parseFloat(pos.y) - 5}%`,
                `${Number.parseFloat(pos.y)}%`,
              ],
              rotate: [0, 15, 0, -15, 0],
            }}
            initial={{ x: pos.x, y: pos.y }}
            key={i}
            transition={{
              duration: duration * 2,
              delay,
              repeat: Number.POSITIVE_INFINITY,
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
            animate={{
              x: [
                beehiveEntranceX,
                `${Number.parseFloat(beehiveEntranceX) + (Math.random() * 10 - 5)}%`,
                beehiveEntranceX,
              ],
              y: [
                beehiveEntranceY,
                `${Number.parseFloat(beehiveEntranceY) + (Math.random() * 10 - 5)}%`,
                beehiveEntranceY,
              ],
              opacity: [0, 1, 1, 0],
              scale: [0.1, 1, 1, 0.1],
              rotate: [0, -10, 10, 0],
            }}
            initial={{
              x: beehiveEntranceX,
              y: beehiveEntranceY,
              opacity: 0,
              scale: 0.1,
            }}
            key={i}
            transition={{
              duration,
              delay: delay * i, // Staggered delay
              repeat: Number.POSITIVE_INFINITY,
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
