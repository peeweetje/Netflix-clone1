import * as stylex from '@stylexjs/stylex';

export const trailerStyles = stylex.create({
  container: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    padding: 8,
  },
  videoWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: 900,
    position: 'relative',
    width: '100%',
  },
  iframe: {
    aspectRatio: '16 / 9',
    height: '100%',
    maxHeight: 'calc(100vh - 100px)',
    width: '100%',
  },
  backButton: {
    backgroundColor: 'var(--theme-primary, #4caf50)',
    borderColor: 'var(--theme-primary-light, #81c784)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4,
    color: 'var(--theme-button-text, #fff)',
    cursor: 'pointer',
    fontSize: '1rem',
    marginBottom: 8,
    paddingBlock: 10,
    paddingInline: 20,
    ':hover': { backgroundColor: 'var(--theme-primary-light, #81c784)' },
  },
});
