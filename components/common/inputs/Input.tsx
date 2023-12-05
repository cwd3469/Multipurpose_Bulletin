import {
  Box,
  Stack,
  styled,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { ErrorType } from 'types/signin';

interface WTextFieldProps {
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | null;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  type?: 'text' | 'password' | 'number';
  error: ErrorType;
  disabled: boolean;
  value: string | number;
  label?: string;
  placeholder?: string;
  helper?: string;
  focusOutEvent?: () => void;
  focusInEvent?: () => void;
  readOnly?: boolean;
  sx?: SxProps<Theme>;
  maxRows?: number;
}

const TextInput = styled(TextField)({
  backgroundColor: '#fff',
  '& .MuiInputBase-input': {
    padding: '14px 12px',
    '&::placeholder': {
      fontSize: '14px',
      color: '#999',
    },
  },
  '& input:valid + fieldset': {
    borderColor: '#CDCDCD',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: '#005DE9',
    borderWidth: 1,
  },
  '& input::placeholder': {
    fontSize: '12px',
  },
  '& .Mui-disabled': {
    backgroundColor: '#f5f5f5',
    color: '#000',
    borderRadius: '4px',
    overflow: 'hidden',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#f5f5f5 !important',
    },
  },
});

const WTextField = (props: WTextFieldProps) => {
  const {
    name,
    disabled,
    error,
    onChange,
    value,
    label,
    type,
    placeholder,
    helper,
    focusOutEvent,
    readOnly,
    focusInEvent,
    maxRows,
    sx,
    onKeyDown,
  } = props;
  const helperTxt = helper ? helper : '';
  const [helperOn, setHelper] = useState<boolean>(false);
  const focusIn = () => {
    setHelper(true);
    focusInEvent ? focusInEvent() : undefined;
  };
  const focusOut = () => {
    setHelper(false);
    focusOutEvent ? focusOutEvent() : undefined;
  };

  return (
    <Stack sx={{ width: '100%', ...sx }}>
      {label ? (
        <Box sx={{ padding: '8px 0', height: '31px' }}>
          <Typography color={'#000'} lineHeight="1.2" className="input-label">
            {label}
          </Typography>
        </Box>
      ) : (
        ''
      )}
      <TextInput
        name={name}
        disabled={disabled}
        error={error.boo}
        onChange={onChange}
        value={value}
        type={type}
        className="wau"
        onFocus={focusIn}
        onBlur={focusOut}
        onKeyDown={onKeyDown}
        maxRows={maxRows ? maxRows : 100}
        inputProps={{
          readOnly: readOnly ? readOnly : false,
        }}
        placeholder={placeholder ? placeholder : ''}
      />
      {helper || error ? (
        <Typography
          className="input-msg"
          variant="caption"
          color={error.boo ? '#FC5935' : '#07A8FF'}
          lineHeight="1"
          padding="8px 0"
          height={'28px'}
        >
          {error.msg ? error.msg : helperOn ? helperTxt : ''}
        </Typography>
      ) : (
        ''
      )}
    </Stack>
  );
};
WTextField.defaultProps = {
  onChange: null,
  error: false,
  disabled: false,
  value: 0,
  label: '',
  type: 'text',
};

export default WTextField;
