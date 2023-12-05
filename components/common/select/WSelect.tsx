import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  SvgIcon,
  SxProps,
  Theme,
} from '@mui/material';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { WOptionType } from 'types/common';

const UnfoldMoreTwoToneIcon = () => (
  <Grid width="auto" container alignItems="center" paddingRight="8px">
    <Image
      src={'/assets/icons/ic_select_small.svg'}
      alt="셀렉트아이콘"
      width="27px"
      height="27px"
    />
  </Grid>
);

const SelectControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: '#fff',
  maring: 0,
  borderRadius: '6px',

  '& .MuiInputBase-root': {
    borderRadius: '6px',
  },
  '& .MuiSelect-select': {
    padding: '10px 0px 10px 14px',
    paddingRight: '0px !important',
    color: '#666',
  },
  // Mui-focused
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));
export type WSelectCustomizeType = {
  value?: string;
  callBack: (id: string) => void;
  width?: string;
  disabled?: boolean;
  name?: string;
};

interface WSelectType {
  name?: string;
  value: string;
  width: string;
  height?: string;
  marginLeft?: string;
  marginTop?: string;
  disabled?: boolean;
  isButton?: boolean;
  onChange: (event: SelectChangeEvent) => void;
  options: WOptionType[];
  MenuPropsSx?: SxProps<Theme>;
  sx?: SxProps<Theme>;
  selectControlSx?: SxProps<Theme>;
  SelectDisplayProps?: CSSProperties;
}

const WSelect = (props: WSelectType) => {
  const {
    selectControlSx,
    name,
    value,
    onChange,
    options,
    width,
    MenuPropsSx,
    SelectDisplayProps,
    height,
    disabled,
    marginLeft,
    marginTop,
    sx,
    isButton,
  } = props;

  return (
    <SelectControl size="small" sx={{ width: width, ...selectControlSx }}>
      <Select
        className="WSelect-root"
        labelId={name}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        SelectDisplayProps={{
          style: { ...SelectDisplayProps },
        }}
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ebeced',
          },
          '& .MuiSvgIcon-root ': {
            color: '#EBECED',
          },
          ...sx,
        }}
        IconComponent={isButton ? undefined : UnfoldMoreTwoToneIcon}
        MenuProps={{
          className: 'WSelect-Munu-root',
          sx: {
            '& .MuiPaper-root': {
              borderRadius: '6px',
              borderColor: '#E0E1E2',
              boxShadow: '0px 2px 10px 0px #00000014',
              marginLeft: marginLeft ? marginLeft : '0px',
              marginTop: marginTop ? marginTop : '5px',
              height: height,
              '& .MuiList-root': {
                padding: '8px',
                width: `${width}`,
              },
            },

            '& .MuiButtonBase-root': {
              padding: '8px',
              borderRadius: '6px',
              color: '#666',

              '&.Mui-selected': {
                backgroundColor: '#F5F5F5',
              },
            },
            ...MenuPropsSx,
          },
        }}
        autoWidth
      >
        {options.map((option, index) => {
          return (
            <MenuItem value={option.id} key={index}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </SelectControl>
  );
};

export default WSelect;
