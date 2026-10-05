import * as stylex from '@stylexjs/stylex';

export const chipStyles = stylex.create({
  container: {
    backgroundColor: 'var(--chip-color)',
    borderRadius: 4,
    color: 'var(--theme-white, #fff)',
    display: 'inline-block',
    fontSize: '0.8rem',
    paddingBlock: 2,
    paddingInline: 6,
    '@media (max-width: 767px)': {
      fontSize: '0.5rem',
      paddingBlock: 1,
      paddingInline: 4,
    },
  },
});
