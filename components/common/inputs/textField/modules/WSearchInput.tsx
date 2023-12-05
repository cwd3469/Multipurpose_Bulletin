import Image from 'next/image';
import {
  Box,
  Grid,
  IconButton,
  styled,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { isEmptyObj } from '@utils/check';

export const SearchTextField = styled(TextField)(({ theme }) => ({
  width: '248px',
  backgroundColor: '#fff',
  ...theme.typography.body1,
  borderRadius: '6px',
  '& .MuiInputBase-input': {
    padding: '10px 40px 10px 10px',
    color: '#000',
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E0E1E2',
    borderRadius: '6px',
  },
}));

const WSearchInput = (props: {
  queryValue?: string;
  search: (txt: string) => void;
  placeholder: string;
  sx?: SxProps<Theme>;
  keyword: string;
}) => {
  const { search, placeholder, sx, keyword } = props;
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const searchEvent = () => {
    search(value);
  };

  const onDebounceFnSearchEvent = useDebounceFn(searchEvent, {
    wait: 300,
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onDebounceFnSearchEvent.run();
    }
  };

  useEffect(() => {
    const query = router.query;
    if (!isEmptyObj(query)) return;
    if (Object.prototype.hasOwnProperty.call(query, keyword)) return;
    setValue('');
  }, [keyword, router.query]);

  useEffect(() => {
    if (props.queryValue) return setValue(props.queryValue);
    setValue('');
  }, [props.queryValue]);

  return (
    <Box position="relative">
      <SearchTextField
        placeholder={placeholder}
        onKeyDown={handleKeyPress}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        sx={sx}
      />
      <IconButton
        sx={{
          position: 'absolute',
          right: '3px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        onClick={onDebounceFnSearchEvent.run}
      >
        <Image
          src={'/assets/icons/search.svg'}
          alt="검색아이콘"
          width="18px"
          height="18px"
        />
      </IconButton>
    </Box>
  );
};

export default WSearchInput;
