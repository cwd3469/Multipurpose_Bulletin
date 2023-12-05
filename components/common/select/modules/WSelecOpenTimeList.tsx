import { WOptionType } from 'types/common';

import { useEffect, useState } from 'react';
import { SelectChangeEvent, SxProps, Theme } from '@mui/material';
import WSelect, { WSelectCustomizeType } from '../WSelect';

interface WSelecOpenTimeListProps extends WSelectCustomizeType {
  timeListOptions: WOptionType[];
  sx?: SxProps<Theme>;
  MenuPropsSx?: SxProps<Theme>;
  width?: string;
  isButton?: boolean;
}

const WSelecOpenTimeList = (props: WSelecOpenTimeListProps) => {
  const {
    value,
    callBack,
    disabled,
    name,
    timeListOptions,
    sx,
    width,
    MenuPropsSx,
    isButton,
  } = props;

  const [option, setOption] = useState<string>(timeListOptions[0].id);

  const onSelectOption = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setOption(value);
    callBack(value);
  };

  useEffect(() => {
    if (value) {
      setOption(JSON.stringify(value));
    }
  }, [value]);

  return (
    <WSelect
      name={name}
      value={option}
      width={width ? width : '100% !important'}
      height={'200px'}
      onChange={onSelectOption}
      options={timeListOptions}
      disabled={disabled}
      MenuPropsSx={MenuPropsSx}
      isButton={isButton}
      sx={{
        color: '#000',
        padding: '0px',
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
        },
        '&.Mui-disabled': {
          backgroundColor: '#ebeced',
          color: '#949494',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 0,
          '&:hover': {
            border: 0,
          },
        },
        '& .MuiSvgIcon-root': {
          display: 'none',
        },
        '& .MuiSelect-select': {
          padding: '0px 0',
          textAlign: 'center',
          color: '#000',
          letterSpacing: '0.5px',
        },
        '& .MuiButtonBase-root.Mui-selected': {
          backgroundColor: '#D9F0FA',
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#4ac6ff',
            border: 0,
          },
        },
        ...sx,
      }}
    />
  );
};

export default WSelecOpenTimeList;
