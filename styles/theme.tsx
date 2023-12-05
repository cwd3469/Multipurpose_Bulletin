import { createTheme } from '@mui/material';
import { koKR } from '@mui/x-date-pickers/locales';
import { koKR as dataGridKoKR } from '@mui/x-data-grid';
import { koKR as coreKoKR } from '@mui/material/locale';

export const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#4ac6ff',
        dark: '#1890ff',
        light: '#48dae5',
        contrastText: '#ffffff',
      },
      error: {
        main: '#FC5935',
      },
      secondary: {
        main: '#623cf8',
        light: '#8a72f9',
      },
      info: {
        main: '#000',
        dark: '#b7b7b7',
        contrastText: '#ffffff',
        light: '#e4e4e4',
      },
      warning: {
        main: '#fa8c16',
        light: '#fba344',
        dark: '#af620f',
        contrastText: '#ffffff',
      },
      success: {
        main: '#11d900',
        light: '#40e033',
        dark: '#0b9700',
        contrastText: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#606060',
        disabled: '#939393',
      },
    },
    typography: {
      h1: {
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      h2: {
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      h3: {
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      h4: {
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      h5: {
        fontSize: '1.500rem',
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      h6: {
        fontSize: '1.250rem',
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      subtitle1: {
        fontSize: '1.125rem',
        fontWeight: 'bold',
        letterSpacing: '-0.0125rem',
      },
      subtitle2: {
        fontSize: '1.000rem',
        fontWeight: '400',
        letterSpacing: '-0.0125rem',
      },
      body1: {
        fontSize: '0.875rem',
        fontWeight: '400',
        letterSpacing: '-0.0125rem',
      },
      body2: {
        fontSize: '1.000rem',
        letterSpacing: '-0.0125rem',
      },
      button: {
        fortSize: '0.875rem',
        letterSpacing: '-0.0125rem',
      },
      caption: {
        fontSize: '0.750rem',
        fontWeight: '400',
        letterSpacing: '-0.0125rem',
      },
      overline: {
        fontSize: '0.625rem',
        letterSpacing: '2px',
      },
    },
  },
  koKR,
  dataGridKoKR,
  coreKoKR,
);
