import {
  Alert,
  AlertProps,
  ThemeProvider,
  Typography,
  styled,
} from '@mui/material';
import { createTheme } from '@mui/material';
import Image from 'next/image';
const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: 4,
          padding: '15px 16px',
          '& .MuiAlert-icon': {
            marginRight: '9.5px',
          },
        },
        message: {
          fontWeight: 400,
          fontSize: '0.875rem',
          letterSpacing: '-0.0125rem',
          padding: '0px',
        },
        standardError: {
          backgroundColor: '#FFF3F4',
          color: '#ed271e',
          border: '1px solid #FF5953',
        },
        icon: {
          padding: '0px',
        },
      },
    },
  },
});
const IconList = (variant?: string, severity?: string) => {
  const iconlist = () => {
    const errorStandardIcon = '/assets/icons/alert/icon_info_red.svg';
    if (!severity) return;
    if (severity === 'error') {
      if (!variant) return errorStandardIcon;
      if (variant === 'standard') return errorStandardIcon;
      if (variant === 'outlined') return errorStandardIcon;
      if (variant === 'filled') return errorStandardIcon;
      return;
    }
    return;
  };
  const iconSrc = iconlist();
  return (
    iconSrc && <Image src={iconSrc} alt="아이콘" width="22px" height="22px" />
  );
};

const WAlert = (props: AlertProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Alert {...props} icon={IconList(props.variant, props.severity)}>
        {typeof props.children === 'string'
          ? props.children.split('\n').map((item, index) => {
              return (
                <Typography
                  lineHeight={'22px'}
                  key={index}
                  letterSpacing="-0.3px"
                >
                  {item}
                </Typography>
              );
            })
          : ''}
      </Alert>
    </ThemeProvider>
  );
};

export default WAlert;
