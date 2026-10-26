import * as stylex from '@stylexjs/stylex';

export const homeStyles = stylex.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
});
