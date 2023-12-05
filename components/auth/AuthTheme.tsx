import {
  Button,
  Checkbox,
  CheckboxProps,
  Grid,
  styled,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';

export const TermsGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TermsButton = styled(Button)(({ theme }) => ({
  padding: '0px',
  marginLeft: 'auto',
  ...theme.typography.subtitle1,
  fontWeight: '400',
  color: '#ccc',
  minWidth: 'auto',
  minHeight: 'auto',
  textDecoration: 'underline',
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: '#4ac6ff',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#DCDCDC',
  },
  '&.Mui-disabled ': {
    backgroundColor: '#DCDCDC',
    color: '#999',
  },
}));

export const TimerButton = styled(Button)(({ theme }) => ({
  padding: '0px',
  ...theme.typography.body2,
  color: '#000',
  fontWeight: '400',
  minWidth: 'auto',
  lineHeight: 1,
}));

const AuthCheckBox = styled(Checkbox)(({ theme }) => ({
  padding: '0px',
  width: '34px',
  height: '34px',
  '& .MuiSvgIcon-root': {
    width: '34px',
    height: '34px',
  },
}));

const CheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 34 34">
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_280_1970)">
          <rect
            x="0.5"
            y="0.5"
            width="33"
            height="33"
            rx="2.5"
            fill="white"
            stroke="#CCCCCC"
          />
          <path
            d="M9 18.2L13.8571 23L26 11"
            stroke="#CCCCCC"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_280_1970">
            <rect width="34" height="34" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

const CheckActiveIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 34 34">
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_280_1950)">
        <rect
          x="0.75"
          y="0.75"
          width="32.5"
          height="32.5"
          rx="2.25"
          fill="white"
          stroke="#4AC6FF"
          strokeWidth="1.5"
        />
        <path
          d="M9 18.2L13.8571 23L26 11"
          stroke="#4AC6FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_280_1950">
          <rect width="34" height="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </SvgIcon>
);

export const TermsCheckBox = (props: CheckboxProps) => {
  return (
    <AuthCheckBox
      {...props}
      icon={<CheckIcon />}
      checkedIcon={<CheckActiveIcon />}
    />
  );
};
