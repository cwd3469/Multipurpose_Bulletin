import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { SecuritySetCheckBox } from '../type';
import { Stack, Typography } from '@mui/material';

const SecuritySetCheckBox = (props: SecuritySetCheckBox) => {
  const { data, onChangeValue, value } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const select = (event.target as HTMLInputElement).value;
    onChangeValue(select);
  };
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="security-set-radio-buttons-group"
        name="security-set-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {data.map((item, index) => {
          return (
            <Stack
              key={index}
              sx={{
                position: 'relative',
              }}
            >
              {item.notRecommended ? (
                <Typography
                  variant="caption"
                  color="#ff3a46"
                  fontWeight="bold"
                  letterSpacing={'-1px'}
                  sx={{
                    position: 'absolute',
                    left: '0px',
                    top: '-12px',
                    width: '220px',
                  }}
                >
                  개인정보 보호를 위해 권장하지 않습니다.
                </Typography>
              ) : (
                ''
              )}
              <FormControlLabel
                value={item.data}
                control={<Radio />}
                label={item.name}
                sx={{
                  '& .MuiButtonBase-root': {
                    color: '#999999',
                    '&.Mui-checked': {
                      color: '#4ac6ff',
                    },
                  },
                  '& .MuiTypography-root': {
                    color: value === item.data ? '#4ac6ff' : '#999999',
                  },
                }}
              />
            </Stack>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default SecuritySetCheckBox;
