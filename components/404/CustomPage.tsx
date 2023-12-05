import { Box, Stack, styled, Typography } from '@mui/material';
import { GnbInspection } from '@components/common/layout/gnb/GnbModules';
import Image from 'next/image';
import { CustomInfo } from '@pages/404';
const CustomPage = (props: { info: CustomInfo }) => {
  return (
    <>
      <CustomPageBox>
        <GnbInspection />
        <Stack
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Box height="120px" className="gap-box" />
            <Image
              src={'/assets/images/error404.png'}
              alt="404"
              className="page-image"
              width={392}
              height={185}
            />
            <Box height="80px" className="gap-box" />
            <Typography
              variant="h4"
              fontSize="42px"
              color="#161a36"
              className="page-title"
            >
              {props.info.title ? props.info.title : ''}
            </Typography>
            <Box height="16px" className="gap-box" />
            <Stack sx={{ gap: '10px' }}>
              <Typography
                variant="h5"
                fontWeight="400"
                color="#878787"
                className="page-contents"
              >
                {props.info.contents1 ? props.info.contents1 : ''}
              </Typography>
              <Typography
                variant="h5"
                fontWeight="400"
                color="#878787"
                className="page-contents"
              >
                {props.info.contents2 ? props.info.contents2 : ''}
              </Typography>
            </Stack>
            <Box height="40px" className="gap-box" />
            {props.info.InspectionData ? (
              <CustomPageDateBox className="contents-box">
                <Typography
                  variant="h5"
                  fontWeight="400"
                  color="#00afff"
                  className="page-contents"
                >
                  시스템 점검 일시 :{' '}
                  {props.info.InspectionData ? props.info.InspectionData : ''}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="400"
                  color="#00afff"
                  className="page-contents"
                >
                  연장 일시 :{' '}
                  {props.info.extensionData ? props.info.extensionData : ''}
                </Typography>
              </CustomPageDateBox>
            ) : (
              ''
            )}
          </Stack>
        </Stack>
      </CustomPageBox>
    </>
  );
};

const CustomPageBox = styled(Stack)(({ theme }) => ({
  padding: '0px 100px',
  '@media screen and (max-width:1200px)': {
    '& .contents-box': {
      width: '100%',
    },
  },
  '@media screen and (max-width:1024px)': {
    padding: '0px 50px',
  },
  '@media screen and (max-width:490px)': {
    padding: '0px 16px',
    '& .gap-box': {
      height: '20px',
    },
    '& .page-image': {
      width: '200px',
    },
    '& .page-title': {
      fontSize: '32px',
    },
    '& .page-contents': {
      fontSize: '18px',
    },
    '& .contents-box': {
      height: 'auto',
      padding: '10px',
    },
  },
}));

const CustomPageDateBox = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  textAlign: 'center',
  alignItems: 'center',
  height: '164px',
  backgroundColor: '#fff',
  gap: '10px',
  borderRadius: '12px',
  width: '962px',
}));

export default CustomPage;
