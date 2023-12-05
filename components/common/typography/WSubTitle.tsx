import { Box, Grid, SxProps, Theme, Typography } from '@mui/material';

const WSubTitle = (props: {
  title: string;
  subTitle?: string;
  require?: boolean;
  unchangeable?: boolean;
  titleSx?: SxProps<Theme>;
  requireSx?: SxProps<Theme>;
  subTitleSX?: SxProps<Theme>;
  sx?: SxProps<Theme>;
}) => {
  const { title, require, unchangeable, titleSx, requireSx, subTitle, subTitleSX, sx } = props;
  return (
    <Grid container alignItems={'center'} gap="2px" sx={sx}>
      <Typography variant="subtitle1" sx={titleSx}>
        {title}
      </Typography>
      {require && (
        <>
          <Box width="1px" />
          <Typography variant="body2" color="#4ac6ff" sx={requireSx}>
            {'(필수)'}
          </Typography>
        </>
      )}
      {unchangeable && (
        <Typography variant="body2" color="#ed271e" fontWeight="500" sx={requireSx}>
          {'(변경 불가)'}
        </Typography>
      )}
      {subTitle && (
        <>
          <Box width="1px" />
          <Typography variant="body1" color="#4E4E4E" sx={subTitleSX}>
            {subTitle}
          </Typography>
        </>
      )}
    </Grid>
  );
};

export default WSubTitle;
