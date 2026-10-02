import * as stylex from '@stylexjs/stylex';

export const seasonalCardStyles = stylex.create({
  container: {
    display: 'inline-block',
    marginTop: 16,
    position: 'relative',
    '@media (max-width: 767px)': { marginTop: 0, transform: 'scale(0.9)' },
  },
});
