import { Box, Grid, styled, SxProps, Theme } from '@mui/material';
import Image from 'next/image';

interface LayoutInterface {
  children: React.ReactNode;
  padding?: string;
  width?: string;
}

interface LogoType {
  width?: string;
}

export const Logo = () => {
  return (
    <Image
      src={'/assets/images/new_logo_01@3x.png'}
      alt="로고"
      height={52}
      width={124}
    />
  );
};

export const ContantsLayout = (props: {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
  bg?: string;
  containerColor?: string;
  sx?: SxProps<Theme>;
}) => {
  const { children, bg, containerColor, sx } = props;
  return (
    <FlexCenter sx={{ backgroundColor: bg ? bg : '#fff' }}>
      <Container
        sx={{
          backgroundColor: containerColor ? containerColor : '#fff',
          ...sx,
        }}
      >
        {children}
      </Container>
    </FlexCenter>
  );
};

const Layout = (props: LayoutInterface) => {
  const { children, width, padding } = props;
  return (
    <Grid container width={width ? width : '100%'} justifyContent="center">
      <Box
        sx={{
          padding: padding ? padding : '80px 0px',
          backgroundColor: '#fff',
          minWidth: '400px',
        }}
      >
        {children}
      </Box>
    </Grid>
  );
};

export default Layout;

const FlexCenter = styled(Grid)(({ theme }) => ({
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
}));

const ImageBox = styled(Box)({
  position: 'relative',
  minHeight: '52px',
});

export const Container = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  width: '1200px',
  padding: '40px 0px 10px',
}));
