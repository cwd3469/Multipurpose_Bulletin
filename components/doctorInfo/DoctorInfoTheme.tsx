import { styled, Switch, SwitchProps } from '@mui/material';

//TODO: switch 기본 값이 오른쪽이 true 왼쪽이 false입니다. 그렇기에 데이터 추가 시 반대로 넣어 주시면 됩니다.
const fullWidth = '182px';
const switchheight = '39px';
const switchWidth = '92px';
const switchOn = '"활성"';
const switchOff = '"비활성"';
const moveTranslateX = 'translateX(90px)';
const borderRadius = '6px';

export const DoctorInfoSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: fullWidth,
  height: switchheight,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 0,
    transitionDuration: '100ms',

    '&.Mui-checked': {
      transform: moveTranslateX,
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
          content: switchOff,
        },
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: switchWidth,
    height: switchheight,
    borderRadius: borderRadius,
    color: '#F1FBFF',
    border: '1px solid #4AC6FF',
    boxShadow: 'none',
    '&:after ': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      height: '13px',
      color: '#4AC6FF',
      textAlign: 'center',
      fontSize: '14px',
      zIndex: '9999999',
      content: switchOn,
      fontWeight: 'bold',
    },
  },

  '& .MuiSwitch-track': {
    borderRadius: borderRadius,
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
      height: '13px',
      color: '#CCCCCC',
      textAlign: 'center',
      fontSize: '14px',
      zIndex: '99',
      fontWeight: '100',
    },
    '&:after': {
      content: switchOn,
    },
    '&:before': {
      content: switchOff,
      right: '0px',
    },
  },
}));

export const DoctorInfoFilePickerLabel = styled('label')`
  width: 200px;
  height: 200px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='1' stroke-dasharray='6%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23AFAFAFFF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  &.drag-in {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%234AC6FFFF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
