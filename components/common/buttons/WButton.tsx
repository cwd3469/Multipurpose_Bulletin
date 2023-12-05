import { Button, ButtonProps, styled, ThemeProvider } from '@mui/material';

import { createTheme } from '@mui/material';

export const buttonTheme = createTheme({
  palette: {
    primary: {
      main: '#4ac6ff',
      dark: '#1890ff',
      light: '#48dae5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#623cf8',
      light: '#8a72f9',
    },
    info: {
      main: '#888888',
      dark: '#b7b7b7',
      contrastText: '#888888',
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
});

export const WButton = styled((props: ButtonProps) => (
  <ThemeProvider theme={buttonTheme}>
    <Button {...props} variant="outlined">
      {props.children}
    </Button>
  </ThemeProvider>
))(({ theme }) => ({
  padding: '8px 14px',
  borderRadius: '6px',
  backgroundColor: '#fff',
  borderWidth: '1.5px',
  ...theme.typography.body2,
  fontWeight: '600',
  lineHeight: '22px',
  verticalAlign: 'middle',
  '&:hover': {
    borderWidth: '1.5px',
  },
}));
