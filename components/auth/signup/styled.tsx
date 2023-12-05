import WSubTitle from '@components/common/typography/WSubTitle';
import Image from 'next/image';
import emotionStyled from '@emotion/styled';

import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
  Grid,
  Stack,
  styled,
  SvgIcon,
  SvgIconProps,
  SxProps,
  Theme,
  Typography,
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
  borderBottom: '1px solid #ccc',
  lineHeight: '1',
  borderRadius: 0,
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

export const ItemInput = (props: {
  title: string;
  require?: boolean;
  children: JSX.Element;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Stack
      sx={{
        gap: '16px',
        width: '100%',
        ...props.sx,
      }}
    >
      <WSubTitle
        require={props.require}
        title={props.title}
        sx={{
          '&.MuiGrid-root .MuiTypography-root': {
            lineHeight: '24px',
          },
        }}
      />
      <Grid container className="body" sx={{ width: '100%' }}>
        {props.children}
      </Grid>
    </Stack>
  );
};

export const ImageViewName = styled(Typography)(({ theme }) => ({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '200px',
  height: '1.5',
  whiteSpace: 'nowrap',
  color: '#333',
}));

export const ImageViewBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '300px',
  overflow: 'hidden',
  borderRadius: '8px',
  border: '1px solid #D8D8D8',
  '& .react-pdf__Page__canvas': {
    width: '200px !important',
    height: '300px !important',
  },
}));

export const UploadBtn = styled(Grid)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid #DBDBDB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 10px',
  borderRadius: '6px',
  gap: '6px',
}));

export const DefaltInfo = () => {
  return (
    <Stack alignItems="center">
      <Typography variant="body2" color="#666" fontWeight={500}>
        파일을 첨부해 주세요.
      </Typography>
      <Typography variant="caption" color="#999">
        파일 형식 JPG,JPEG,PNG,PDF
      </Typography>
      <Box height="24px" />
      <UploadBtn>
        <Box width="16px" height="16px" position={'relative'}>
          <Image src={'/assets/icons/upload.svg'} alt="업로드" layout="fill" />
        </Box>
        <Typography variant="body1" color="#333">
          파일 등록하기
        </Typography>
      </UploadBtn>
    </Stack>
  );
};

export const DeleteBtn = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5);',
  width: '32px',
  height: '32px',
  padding: '3px',
  minWidth: 'auto',
  borderRadius: '0px 6px 0px 0px',
  position: 'absolute',
  right: '0px',
  top: '0px',
  '&:hover': {
    backgroundColor: '#999',
  },
}));

export const FileLadel = emotionStyled.label`
  width: 200px;
  height: 300px;
  background-color: #f8f8f8;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23D8D8D8FF' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  position: relative;
  &.drag-in {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%2300B9FFFF' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;
