import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import CloseIcon from '@mui/icons-material/Close';
import BadgeIcon from '@mui/icons-material/Badge';

const items = () => {
  if(localStorage.getItem('userRole') == 'Cliente'){
    return [
      {
        href: '/Usuarios',
        icon: (<UserIcon fontSize="small" />),
        title: 'Usuarios'
      },
      {
        href: '/Noticias',
        icon: (<NewspaperIcon fontSize="small" />),
        title: 'Noticias'
      },
      {
        href: '/',
        icon: (<CalendarMonthIcon fontSize="small" />),
        title: 'Eventos'
      },
      {
        href: '/Escarapela',
        icon: (<BadgeIcon fontSize="small" />),
        title: 'Escarapela'
      },
      {
        href: '/loggout',
        icon: (<CloseIcon fontSize="small" />),
        title: 'Loggout'
      }
    ]; 
  }
  else{
    return [
      {
        href: '/Reportes',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Reportes'
      },
      {
        href: '/Usuarios',
        icon: (<UserIcon fontSize="small" />),
        title: 'Usuarios'
      },
      {
        href: '/Noticias',
        icon: (<NewspaperIcon fontSize="small" />),
        title: 'Noticias'
      },
      {
        href: '/',
        icon: (<CalendarMonthIcon fontSize="small" />),
        title: 'Eventos'
      },
      {
        href: '/Escarapela',
        icon: (<BadgeIcon fontSize="small" />),
        title: 'Escarapela'
      },
      {
        href: '/loggout',
        icon: (<CloseIcon fontSize="small" />),
        title: 'Loggout'
      }
    ];
  }
}


export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 4 }}>
            <NextLink
              href="/"
              passHref
            >
              <a href='/' style={{ display: 'flex', textDecoration: 'none', alignItems: 'center', gap: '0.75rem' }}>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
                <Typography sx={{ color: '#7B61FF', fontWeight: 'bold' }}>ABC</Typography>
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items().map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
