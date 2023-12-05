import { Grid, SxProps, Theme, Typography } from '@mui/material';

const WDayTimeText = (props: {
  day: string;
  time: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Grid container justifyContent={'center'} gap="3px" sx={props.sx}>
      <Typography
        variant="overline"
        fontWeight={'700'}
        fontSize={'0.875rem'}
        letterSpacing="-0.14px !important"
      >
        {props.day}
      </Typography>
      <Typography
        variant="overline"
        color="#666"
        fontWeight={'400'}
        fontSize={'0.875rem'}
        letterSpacing="-0.14px !important"
      >
        {props.time}
      </Typography>
    </Grid>
  );
};

export default WDayTimeText;
