import * as stylex from '@stylexjs/stylex';

export const emptyStateStyles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  content: {
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '8px',
  },
  message: {
    color: '#fff',
  },
});
