import * as stylex from '@stylexjs/stylex';

const spin = stylex.keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const spinnerStyles = stylex.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    marginTop: 32,
    width: '100%',
  },
  spinner: {
    animationName: spin,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    borderColor: 'var(--theme-primary, #4caf50)',
    borderStyle: 'solid',
    borderWidth: 4,
    borderRadius: '50%',
    borderTopColor: 'transparent',
    height: 50,
    width: 50,
  },
  text: {
    color: 'var(--theme-primary, #4caf50)',
    fontSize: '1rem',
    marginTop: 8,
  },
});
