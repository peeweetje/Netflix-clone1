import * as stylex from '@stylexjs/stylex';

export const heroStyles = stylex.create({
  leafContainer: {
    height: '100%', left: 0, overflow: 'hidden', pointerEvents: 'none',
    position: 'absolute', top: 0, width: '100%', zIndex: 1,
  },
  butterflyContainer: {
    height: '100%', left: 0, overflow: 'hidden', pointerEvents: 'none',
    position: 'absolute', top: 0, width: '100%', zIndex: 3,
  },
  snowContainer: {
    height: '100%', left: 0, overflow: 'hidden', pointerEvents: 'none',
    position: 'absolute', top: 0, width: '100%', zIndex: 1,
  },
  banner: {
    alignItems: 'stretch', backgroundImage: 'var(--banner-image)',
    backgroundPosition: 'center', backgroundSize: 'cover', display: 'flex',
    height: '75vh', justifyContent: 'center', minHeight: 500,
    position: 'relative', width: '100%',
    '@media (max-width: 767px)': { height: '50vh', minHeight: 300 },
  },
  overlay: {
    alignItems: 'center', display: 'flex', flexDirection: 'row', height: '100%',
    justifyContent: 'space-between', left: 0, paddingInline: 20,
    position: 'absolute', top: 0, width: '100%', zIndex: 2,
    '@media (max-width: 767px)': {
      flexDirection: 'column', justifyContent: 'center', textAlign: 'center',
    },
  },
  title: {
    maxWidth: '30vw',
    '@media (max-width: 767px)': { fontSize: '1.5rem', maxWidth: '80vw' },
  },
  overview: {
    color: 'var(--theme-white, #fff)', fontSize: '1rem', lineHeight: 1.5,
    marginLeft: 4, maxWidth: '32vw', textAlign: 'right',
    textShadow: '2px 2px 12px rgba(0, 0, 0, 0.7)',
    '@media (max-width: 767px)': {
      fontSize: '0.8rem', marginLeft: 0, maxWidth: '80vw', textAlign: 'center',
    },
  },
  buttons: {
    display: 'flex', gap: 18, marginTop: 18,
    '@media (max-width: 767px)': { justifyContent: 'center' },
  },
  button: {
    backgroundColor: 'var(--theme-primary, #4caf50)',
    borderColor: 'var(--theme-primary-light, #81c784)',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 4, color: 'var(--theme-button-text, #fff)', cursor: 'pointer',
    fontSize: '1rem', fontWeight: 600, padding: '0.7rem 2rem',
    transition: 'background 0.2s',
    ':hover': {
      backgroundColor: 'var(--theme-primary-light, #81c784)',
      color: 'var(--theme-black, #000)',
    },
    '@media (max-width: 767px)': { fontSize: '0.8rem', padding: '0.8rem 1.25rem' },
  },
  leaf: { height: 20, position: 'absolute', top: -10, width: 20 },
  snow: {
    backgroundColor: 'var(--theme-white, #fff)', borderRadius: 4, height: 5,
    opacity: 0.7, position: 'absolute', top: -10, width: 5,
  },
  flowersContainer: {
    bottom: 0, height: 250, left: 0, pointerEvents: 'none', position: 'absolute',
    width: '100%', zIndex: 3,
  },
  beesContainer: {
    height: '100%', left: 0, overflow: 'hidden', pointerEvents: 'none',
    position: 'absolute', top: 0, width: '100%', zIndex: 4,
  },
  beehiveContainer: {
    height: 100, position: 'absolute', right: '5%', top: 0, width: 100, zIndex: 5,
  },
});
