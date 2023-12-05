import { Box, Button, Menu, MenuItem, MenuProps, styled, Switch, SwitchProps } from '@mui/material';
import { colors } from '../../../../styles';
import { useRouter } from 'next/router';
import { CSSProperties, useCallback, useState } from 'react';
import { GnbItemType } from './types';
import Link from 'next/link';

export const GnbSwitch = styled((props: SwitchProps) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    checked={!props.checked}
  />
))(({ theme }) => ({
  width: 139,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 0,
    transitionDuration: '200ms',

    '&.Mui-checked': {
      transform: 'translateX(64px)',
      color: '#000',
      boxShadow: 'none',

      '& + .MuiSwitch-track': {
        backgroundColor: '#F8F8F8',

        opacity: 1,
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
      '& .MuiSwitch-thumb': {
        '&:after': {
          content: '"OFF"',
        },
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 75,
    height: 32,
    borderRadius: '50px',
    color: theme.palette.primary.main,
    boxShadow: 'none',
    '&:after ': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%',
      height: '13px',
      color: '#fff',
      textAlign: 'center',
      fontSize: '14px',
      zIndex: '9999999',
      content: '"ON"',
      fontWeight: 'bold',
    },
  },

  '& .MuiSwitch-track': {
    borderRadius: '50px',
    backgroundColor: '#F8F8F8',
    // border: '1px solid #D8D8D8',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    '&:before,&:after ': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '54%',
      height: '13px',
      color: '#999',
      textAlign: 'center',
      fontSize: '14px',
      zIndex: '9999999',
      fontWeight: '100',
    },
    '&:after': {
      content: '"ON"',
    },
    '&:before': {
      content: '"OFF"',
      right: '0px',
    },
  },
}));

export const GnbItem = styled(Button)(({ theme }) => ({
  backgroundColor: colors.gray_11,
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  color: '#000',
  minWidth: 'auto',
  letterSpacing: '-0.32px',
  '& a': {
    color: '#999999',
    textDecoration: 'none',
  },
}));

export const GnbATag = styled('a')(({ theme }) => ({
  backgroundColor: colors.gray_11,
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'center',
  color: '#999999',
  textDecoration: 'none',
  minWidth: 'auto',
}));

export const GnbLink = (props: {
  children: string;
  href: string;
  style: CSSProperties | undefined;
  disabled?: boolean;
}) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        '& .disabled-link': {
          pointerEvents: 'none',
        },
      }}
    >
      {router.pathname === props.href ? (
        <GnbATag style={props.style}>{props.children}</GnbATag>
      ) : props.disabled ? (
        <GnbATag style={props.style}>{props.children}</GnbATag>
      ) : (
        <Link href={props.href} passHref className={'disabled-link'}>
          <GnbATag style={props.style}>{props.children}</GnbATag>
        </Link>
      )}
    </Box>
  );
};

const StyledMenu = styled((props: MenuProps) => <Menu elevation={0} {...props} />)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 13,
    marginTop: theme.spacing(1),
    minWidth: 180,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    '& .MuiMenu-list': {
      padding: '8px',
    },
    '& .MuiMenuItem-root': {
      padding: '8px 5px',
      borderRadius: 3,
      ...theme.typography.body2,
    },
  },
}));

export const GnbItemDropDown = (props: GnbItemType) => {
  const { sx, name, tgtBtn, tgtMenu, itemList, pageName, disabled } = props;
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (path: string) => {
    router.push(path, undefined, {
      shallow: true,
    });
    setAnchorEl(null);
  };

  const activeItem = useCallback(
    (pageid: string) => {
      const unActive = {
        color: colors.gray_05,
        fontWeight: '300 !important',
        backgroundColor: colors.gray_11,
      };
      const style = {
        color: colors.gray_01,
        fontWeight: 'bold',
        backgroundColor: colors.gray_10,
      };

      return pageName === pageid ? style : unActive;
    },
    [pageName],
  );

  return (
    <div>
      <GnbItem
        sx={sx}
        id={tgtBtn}
        aria-controls={open ? `${tgtMenu}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={disabled}
      >
        {name}
      </GnbItem>
      <StyledMenu
        id={tgtMenu}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `${tgtBtn}`,
        }}
      >
        {itemList.map((menu, index) => {
          return (
            <MenuItem
              key={index}
              sx={{ ...activeItem(menu.pageid) }}
              onClick={() => {
                handleClose(menu.path);
              }}
            >
              {menu.name}
            </MenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};
