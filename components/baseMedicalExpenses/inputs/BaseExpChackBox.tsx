import { TermsCheckBox } from '@components/auth/AuthTheme';
import WSubTitle from '@components/common/typography/WSubTitle';
import {
  Box,
  Checkbox,
  CheckboxProps,
  Grid,
  styled,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';

const AuthCheckBox = styled(Checkbox)(({ theme }) => ({
  padding: '0px',
  width: '28px',
  height: '28px',
  '& .MuiSvgIcon-root': {
    width: '28px',
    height: '28px',
  },
}));

const CheckIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 28 28">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x=".5" y=".5" width="27" height="27" rx="2.5" fill="#fff" />
        <path
          d="m8.75 14.75 3 3 7.5-7.5"
          stroke="#CFCFCF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x=".5" y=".5" width="27" height="27" rx="2.5" stroke="#CFCFCF" />
      </svg>
    </SvgIcon>
  );
};

const CheckActiveIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 28 28">
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="3" fill="#4AC6FF" />
      <path
        d="m8.75 14.75 3 3 7.5-7.5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </SvgIcon>
);

export const BaseExpChackBox = (props: CheckboxProps) => {
  return (
    <AuthCheckBox
      {...props}
      icon={<CheckIcon />}
      checkedIcon={<CheckActiveIcon />}
    />
  );
};

export default BaseExpChackBox;
