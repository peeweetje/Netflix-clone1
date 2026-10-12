import * as stylex from '@stylexjs/stylex';

export const searchBarStyles = stylex.create({
  search: {
    marginLeft: 'auto',
    paddingRight: 20,
    '@media (max-width: 767px)': {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 0,
      paddingBottom: 4,
      width: '100%',
    },
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    '@media (max-width: 767px)': { marginTop: 4 },
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: 'var(--theme-primary, #4caf50)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 6,
    color: 'var(--theme-white, #fff)',
    padding: '8px 8px 8px 40px',
    transition: 'border-color 0.3s ease',
    '::placeholder': { color: 'var(--theme-white, #fff)', opacity: 0.7 },
    ':focus': { outline: 'none' },
    '::-webkit-search-cancel-button': { cursor: 'pointer', filter: 'invert(1)' },
    '@media (max-width: 1200px)': {
      fontSize: '0.8rem',
      padding: '8px 8px 8px 15px',
      width: '95%',
    },
    '@media (max-width: 1024px)': { fontSize: '0.7rem' },
    '@media (max-width: 992px)': { padding: '4px 4px 4px 10px' },
    '@media (max-width: 767px)': { fontSize: '0.7rem', width: '100%' },
  },
  icon: {
    color: 'var(--theme-primary, #4caf50)',
    left: 8,
    pointerEvents: 'none',
    position: 'absolute',
    '@media (max-width: 1200px)': { display: 'none' },
  },
});
