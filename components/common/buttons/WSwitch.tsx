import { Switch, SwitchProps } from '@mui/material';
import { theme } from '@styles/theme';
// base info
const fullWidth = '182px';
const switchheight = '39px';
const switchWidth = '92px';
const switchOn = '"활성"';
const switchOff = '"비활성"';
const moveTranslateX = 'translateX(90px)';
const borderRadius = '6px';

type WSwitchInfoType = {
  fullWidth: string;
  switchheight: string;
  switchWidth: string;
  switchOn: string;
  switchOff: string;
  moveTranslateX: string;
  borderRadius: string;
};

interface WSwitchType extends SwitchProps {
  info?: WSwitchInfoType;
}

const WSwitch = (props: WSwitchType) => {
  const { info } = props;

  const style = {
    width: info ? info.fullWidth : fullWidth,
    height: info ? info.switchheight : switchheight,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 0,
      transitionDuration: '100ms',
      '&.Mui-disabled': {
        '& .MuiSwitch-thumb': {
          color: '#fff !important',
        },
      },
      '&.Mui-checked': {
        transform: info ? info.moveTranslateX : moveTranslateX,
        color: '#000',
        boxShadow: 'none',

        '& + .MuiSwitch-track': {
          backgroundColor: '#fff',
          border: '1px solid #CCCCCC',
          opacity: 1,
        },

        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
        '& .MuiSwitch-thumb': {
          '&:after': {
            content: info ? info.switchOff : switchOff,
          },
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: '#999',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: info ? info.switchWidth : switchWidth,
      height: info ? info.switchheight : switchheight,
      borderRadius: info ? info.borderRadius : borderRadius,
      color: '#F1FBFF',
      border: '1px solid #4AC6FF',
      backgroundColor: '#E9F2FD',
      boxShadow: 'none',
      '&:after ': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '100%',
        color: '#4AC6FF',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: '9999999',
        content: info ? info.switchOn : switchOn,
        fontWeight: 'bold',
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: info ? info.borderRadius : borderRadius,
      backgroundColor: '#fff',
      border: '1px solid #CCCCCC',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      '&:before,&:after ': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '50%',

        color: '#CCCCCC',
        textAlign: 'center',
        fontSize: '14px',
        zIndex: '99',
        fontWeight: '100',
      },
      '&:after': {
        content: info ? info.switchOn : switchOn,
      },
      '&:before': {
        content: info ? info.switchOff : switchOff,
        right: '0px',
      },
    },
  };

  return (
    <Switch
      {...props}
      sx={style}
      focusVisibleClassName={props.className}
      disableRipple
      checked={!props.checked}
    />
  );
};

export default WSwitch;
