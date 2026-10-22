import * as stylex from '@stylexjs/stylex';

const wingFlap = stylex.keyframes({
  from: { transform: 'rotateX(0deg)' },
  '50%': { transform: 'rotateX(45deg)' },
  to: { transform: 'rotateX(0deg)' },
});

export const butterflyStyles = stylex.create({
  wings: {
    animationName: wingFlap,
    animationDuration: '0.5s',
    animationDirection: 'alternate',
    animationIterationCount: 'infinite',
    transformOrigin: 'center',
  },
});
