import { ButtonTheme } from '@karya_app1/rain-js';

const theme: Partial<ButtonTheme> = {
  colors: {
    primary: {
      main: 'var(--primary-main)',
      text: 'var(--secondary-main)',
      hover: 'var(--primary-main-hover)',
      border: 'transparent',
    },
    secondary: {
      main: 'var(--secondary-main)',
      text: 'var(--primary-main)',
      hover: 'var(--secondary-main-hover)',
      border: 'var(--primary-main)',
    },
    error: {
      main: '#d32f2f',
      text: '#fff',
      hover: '#c62828',
      border: 'transparent',
    },
    success: {
      main: '#388e3c',
      text: '#fff',
      hover: '#2e7d32',
      border: 'transparent',
    },
    warning: {
      main: '#f57c00',
      text: '#fff',
      hover: '#ef6c00',
      border: 'transparent',
  },
    info: {
      main: '#0288d1',
      text: '#fff',
      hover: '#0277bd',
      border: 'transparent',
    },
  },
};

export default theme;