import {
  Grid,
  GridTypeMap,
  SxProps,
  Theme,
  Typography,
  TypographyTypeMap,
} from '@mui/material';

export const RequiredTitle = (props: {
  title: string;
  required?: boolean;
  textStyle?: SxProps<Theme>;
  style?: React.CSSProperties;
  gridStyle?: SxProps<Theme>;
  onClick?: () => void;
}) => {
  const { title, required, textStyle, style, gridStyle, onClick } = props;
  return (
    <Grid
      container
      gap="2px"
      alignItems={'center'}
      sx={{ cursor: onClick ? 'pointer' : 'default', ...gridStyle }}
      onClick={onClick}
    >
      <Typography variant="subtitle1" lineHeight={'1'} sx={textStyle}>
        {title}
      </Typography>
      {required ? (
        <span
          style={{
            color: '#4AC6FF',
            fontSize: '1rem',
            fontWeight: '400',
            ...style,
          }}
        >
          (필수)
        </span>
      ) : (
        ''
      )}
    </Grid>
  );
};
