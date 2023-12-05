import WSubTitle from '@components/common/typography/WSubTitle';
import { ContentsSection } from '@components/setting/SettingTheme';
import { Box, Grid } from '@mui/material';

const MyinfoSection = ({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) => {
  return (
    <ContentsSection>
      <WSubTitle title={title} titleSx={{ lineHeight: '24px' }} />
      <Grid container className="body" sx={{ width: '100%' }}>
        <Box width="100%">{children}</Box>
      </Grid>
    </ContentsSection>
  );
};

export default MyinfoSection;
