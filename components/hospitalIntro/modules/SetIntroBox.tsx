import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';

interface SetIntroBoxType {
  children?: JSX.Element | JSX.Element[] | null;
  title: string;
  sx?: SxProps<Theme>;
}

const SetIntroBox = (props: SetIntroBoxType) => {
  const { children, title, sx } = props;
  return (
    <Stack
      sx={{
        gap: '12px',
        ...sx,
      }}
    >
      <Typography variant="body2" fontWeight={'500'} lineHeight="1">
        {title}
      </Typography>

      <Stack>{children}</Stack>
    </Stack>
  );
};

export default SetIntroBox;
