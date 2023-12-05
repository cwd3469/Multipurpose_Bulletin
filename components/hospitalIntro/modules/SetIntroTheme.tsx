import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Switch,
  SwitchProps,
  TextareaAutosize,
  Typography,
  ToggleButton,
  SxProps,
  Theme,
} from '@mui/material';
import { UidList } from '@components/common/fileUpload/types';
import Image from 'next/image';

export const SigninBody = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  width: '1200px',
  height: '770px',
  backgroundColor: '#fff',
  border: '1px solid #f2f2f2',
  borderRadius: '12px',
  padding: '20px',
}));

export const SenterSection = styled(Stack)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '16px',
}));

export const LeftSection = styled(Stack)(({ theme }) => ({
  width: '770px',
  gap: '14px',
}));

export const RightSection = styled(Stack)(({ theme }) => ({
  width: '361px',
  gap: '40px',
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  width: '180px',
  height: '60px',
  boxShadow: 'none',
}));

export const SaveBackButton = styled(SaveButton)(({ theme }) => ({
  backgroundColor: '#d3d3d3',
  color: '#888888',
  '&:hover': {
    backgroundColor: '#888',
    color: '#fff',
    boxShadow: 'none',
  },
}));

export const SetIntroSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 127,
  height: 48,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 0,
    transitionDuration: '100ms',

    '&.Mui-checked': {
      transform: 'translateX(54px)',
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
          content: '"OFF"',
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
    width: 73,
    height: 48,
    borderRadius: '10px',
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
      content: '"ON"',
      fontWeight: 'bold',
    },
  },

  '& .MuiSwitch-track': {
    borderRadius: '10px',
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
      content: '"ON"',
    },
    '&:before': {
      content: '"OFF"',
      right: '0px',
    },
  },
}));

export const SetIntroToggle = styled(ToggleButton)(({ theme }) => ({
  borderRadius: '6px',
  border: '1px solid #ebeced',
  color: '#cccccc',
  letterSpacing: '-0.13px',
  fontWeight: '400',
  fontSize: '13px',
  '&.Mui-selected': {
    border: '1px solid #4AC6FF',
    fontWeight: '400',
  },
}));

export const SetPackToggle = styled(ToggleButton)(({ theme }) => ({
  width: '177px',
  borderRadius: '6px',
  '&.Mui-selected': {
    border: '1px solid #4AC6FF',
    backgroundColor: '#fff',
  },
}));

export const SetIntroTextArea = styled(TextareaAutosize)(({ theme }) => ({
  ...theme.typography.body1,
  resize: 'none',
  height: '172px !important',
  padding: '10px',
  boxSizing: 'border-box',
}));

export const HospitalIntroFileLadel = styled('label')`
  width: 240px;
  height: 120px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='1' stroke-dasharray='6%2c 5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  text-align: center;
  flex-direction: column;
  gap: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23D8D8D8FF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  &.drag-in {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%234AC6FFFF' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;

export const DefaltInfo = () => {
  return (
    <Stack alignItems="center" gap="10px">
      <Typography
        variant="body1"
        color="#666"
        lineHeight={'1'}
        letterSpacing={'-1px'}
      >
        파일을 첨부해 주세요.
      </Typography>
      <Typography
        variant="caption"
        color="#999"
        lineHeight={'1.3'}
        width="120px"
        letterSpacing={'-1px'}
      >
        파일 형식 JPG,JPEG, PNG
      </Typography>
      <UploadBtn>
        <Image
          src={'/assets/icons/upload.svg'}
          alt="업로드"
          width={16}
          height={16}
        />
        <Typography
          variant="caption"
          color="#333"
          lineHeight={'1'}
          letterSpacing={'-1px'}
        >
          파일 등록하기
        </Typography>
      </UploadBtn>
    </Stack>
  );
};

export const ImageView = (props: {
  inx: number;
  img: UidList | UidList;
  deleteImg: (index: number) => void;
  sx?: SxProps<Theme>;
}) => {
  const { inx, img, deleteImg, sx } = props;
  return (
    <Grid
      flexDirection="column"
      container
      key={inx}
      sx={{
        position: 'relative',
        width: '240px',
        height: '115px',
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
        ...sx,
      }}
    >
      <Box
        className="wimageBox"
        sx={{
          width: '240px',
          height: '115px',
          position: 'relative',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        <Image
          src={img.type == 'application/pdf' ? '' : img.url}
          alt="이미지"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <DeleteBtn
        className="deleteBtn"
        onClick={() => {
          deleteImg(img.index);
        }}
      >
        <Box width="24px" height="24px" position={'relative'}>
          <Image
            src={'/assets/icons/closeIcon.svg'}
            alt="로고 취소"
            width={24}
            height={24}
          />
        </Box>
      </DeleteBtn>
    </Grid>
  );
};

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

export const DeleteBtn = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5);',
  width: '32px',
  height: '32px',
  padding: '3px',
  minWidth: 'auto',
  borderRadius: '0px 6px 0px 0px',
  position: 'absolute',
  right: '0',
  '&:hover': {
    backgroundColor: theme.palette.info.dark,
  },
}));
