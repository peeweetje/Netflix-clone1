import * as stylex from '@stylexjs/stylex';

export const searchStyles = stylex.create({
  results: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'center',
    marginTop: 64,
  },
  result: { position: 'relative' },
});
