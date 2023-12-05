import { WaitingRoomTextarea } from '@components/waitingRoom/WaitingRoomTheme';
import { Box, Grid, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

interface WMaxTextareaType {
  disabled?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  helper?: string;
  maxLength: number;
  sx?: SxProps<Theme>;
}

const WMaxTextarea = (props: WMaxTextareaType) => {
  const {
    disabled,
    value,
    onChange,
    placeholder,
    helper,
    maxLength,
    onFocus,
    onBlur,
    sx,
  } = props;
  const [helperOn, setHelperOn] = useState<boolean>(false);
  const onFocusEvent = useCallback(() => {
    setHelperOn(true);
    if (onFocus) onFocus();
  }, [onFocus]);

  const onBlurEvent = useCallback(() => {
    setHelperOn(false);
    if (onBlur) onBlur();
  }, [onBlur]);
  return (
    <Stack sx={sx}>
      <Box
        className="WMaxTextarea-Box"
        sx={{
          padding: '12px',
          border: '1px solid #EBECED',
          borderRadius: '6px',
          backgroundColor: disabled ? '#F8F8F8' : '#fff',
        }}
      >
        <WaitingRoomTextarea
          className="W-Textarea"
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocusEvent}
          onBlur={onBlurEvent}
        />
        <Grid container justifyContent={'end'}>
          <Typography variant="caption" lineHeight={'1'} className="Length">
            {value.length}
          </Typography>
          {''}
          <Typography
            variant="caption"
            lineHeight={'1'}
            color="#999"
            className="MaxLength"
          >
            /{maxLength}자
          </Typography>
        </Grid>
      </Box>
      {helper ? (
        <Typography
          variant="caption"
          lineHeight={'1.5'}
          color="#4ac6ff"
          className="Helper"
        >
          {helperOn ? helper : ''}
        </Typography>
      ) : (
        ''
      )}
    </Stack>
  );
};

export default WMaxTextarea;
