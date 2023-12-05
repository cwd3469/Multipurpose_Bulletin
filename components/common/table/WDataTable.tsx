/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Grid, Button, Typography, styled, SxProps, Theme, Stack } from '@mui/material';
import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const GridButton = (props: {
  onClick?: () => void;
  children: string | JSX.Element;
  disabled?: boolean;
  style?: SxProps<Theme>;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}) => {
  const { onClick, children, disabled, style, startIcon, endIcon } = props;

  return (
    <Button
      disabled={disabled}
      variant="outlined"
      color="info"
      size="small"
      onClick={onClick}
      className={startIcon && 'Icon-style'}
      sx={{
        borderRadius: '6px',
        border: '1px solid #e0e1e2',
        padding: '9px 11px',
        '&.Mui-disabled': {
          backgroundColor: '#f8f8f8',
        },
        '&.Icon-style': {
          padding: '10px',
          paddingLeft: '5px',
        },
        ...style,
      }}
    >
      <Grid container gap="3px" alignItems="center">
        {startIcon ? (
          startIcon
        ) : (
          <Image
            src={disabled ? '/assets/icons/copyDisable.svg' : '/assets/icons/copyIcon.svg'}
            width={10}
            height={14}
            alt="copy"
          />
        )}
        <Typography variant="caption" lineHeight="1">
          {children}
        </Typography>
        {endIcon ? endIcon : ''}
      </Grid>
    </Button>
  );
};
GridButton.defaultProps = {
  disable: false,
};

const NoData = (props: { txt?: string }) => {
  const { txt } = props;
  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Stack
        height="50px"
        gap="6px"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid container justifyContent="center" color="#999">
          {' '}
          <InfoOutlinedIcon sx={{ fontSize: '15px' }} />
        </Grid>
        <Typography color="#999" fontWeight="400" lineHeight={'1'}>
          {txt ? txt : '조회 내역이 없습니다.'}
        </Typography>
      </Stack>
    </Stack>
  );
};

const DataTable = styled(DataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#f8f8f8',
  },
  '& .MuiDataGrid-columnHeader': {
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: '600',
      letterSpacing: '0px',
    },
    '&:focus': {
      outline: 'solid #fff 1px',
    },
  },
  '& .MuiDataGrid-columnHeader ,& .MuiDataGrid-cell': {
    padding: '3px',
    whiteSpace: 'break-spaces !important',
    boxSizing: 'border-box',
  },
  '& .MuiDataGrid-columnHeadersInner': {
    backgroundColor: '#f8f8f8',
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    ...theme.typography.body1,
    justifyContent: 'center',
    letterSpacing: '0px',
  },

  '& .MuiDataGrid-cell': {
    ...theme.typography.body1,
    justifyContent: 'center',
    color: '#555555',
    overflow: 'auto',
  },
  '& .MuiDataGrid-cellContent': {
    width: '100%',
    textAlign: 'center',
  },
  '& .MuiDataGrid-row ': {
    '& .MuiTypography-root': {
      letterSpacing: '-1px',
    },
  },
  '& .MuiDataGrid-columnSeparator': {
    '& .MuiSvgIcon-root': {
      display: 'none',
    },
  },
  '& .MuiDataGrid-menuIcon': {
    display: 'none',
  },
  '& .MuiDataGrid-virtualScrolle': {
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none',
  },
}));

const WDataTable = (props: {
  rows: any;
  columns: GridColDef[];
  headerHeight?: number;
  rowHeight?: number;
  pageSize?: number;
  noDataTxt?: string;
  sx?: SxProps<Theme>;
  className?: string;
}): JSX.Element => {
  const { rows, columns, headerHeight, rowHeight, pageSize, noDataTxt, sx, className } = props;

  const Component = () => {
    return NoData({ txt: noDataTxt });
  };
  return (
    <DataTable
      className={className}
      headerHeight={headerHeight ? headerHeight : 64}
      rowHeight={rowHeight ? rowHeight : 64}
      rows={rows}
      columns={columns}
      pageSize={pageSize ? pageSize : 10}
      rowsPerPageOptions={[pageSize ? pageSize : 10]}
      components={{
        NoRowsOverlay: Component,
        NoResultsOverlay: Component,
      }}
      sx={sx}
    />
  );
};

export default WDataTable;
