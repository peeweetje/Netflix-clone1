import * as stylex from '@stylexjs/stylex';

const wingFlap = stylex.keyframes({
  from: { transform: 'rotateZ(0deg)' },
  '50%': { transform: 'rotateZ(20deg)' },
  to: { transform: 'rotateZ(0deg)' },
});

export const beeStyles = stylex.create({
  wings: {
    animationName: wingFlap,
    animationDuration: '0.1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    transformOrigin: '50% 50%',
  },
});
