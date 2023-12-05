import { Box, Grid, Pagination, PaginationItem, SvgIcon, SxProps, Theme } from '@mui/material';
import ChevronLeft from 'public/assets/icons/chevron-left.svg';
import ChevronDoubleLeft from 'public/assets/icons/chevron-double-left.svg';
import ChevronRight from 'public/assets/icons/chevron-right.svg';
import ChevronDoubleRight from 'public/assets/icons/chevron-double-right.svg';

const WPagination = (props: {
  pagination: (event: React.ChangeEvent<unknown>, value: number) => void;
  page: number;
  count: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fontSize?: string;
  minWidth?: string;
  paddingTop?: string;
  sx?: SxProps<Theme>;
}) => {
  const { pagination, page, count, size, color, fontSize, minWidth, paddingTop, sx } = props;
  return (
    <Grid container justifyContent="center" width="100%" sx={sx}>
      <Box minWidth={minWidth ? minWidth : '440px'} paddingTop={paddingTop ? paddingTop : '0px'}>
        <Pagination
          count={count}
          className="WPagination-root"
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          size={size ? size : 'medium'}
          page={page}
          sx={{
            '& .MuiPagination-ul': {
              justifyContent: 'center',
              gap: '4px',
            },
            '& .MuiButtonBase-root': {
              height: '28px',
              lineHeight: '28px',
              minWidth: '28px',
              color: color ? color : '#999',
              fontSize: fontSize ? fontSize : '16px',
              '&.Mui-selected': {
                color: '#fff',
              },
            },
            '& .MuiSvgIcon-root': {
              color: color ? color : '#333',
              fontSize: fontSize ? fontSize : '18px',
            },
          }}
          onChange={pagination}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ChevronLeft,
                first: ChevronDoubleLeft,
                next: ChevronRight,
                last: ChevronDoubleRight,
              }}
              {...item}
            />
          )}
        />
      </Box>
    </Grid>
  );
};

export default WPagination;
