import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip,Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import { getInitials } from 'src/utils/get-initials';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        > 

          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h5" component="h5" sx={{color:'black', fontSize:'1rem'}}>
              {localStorage.getItem('userName')}
          </Typography>
          <Avatar
            src={"https://res.cloudinary.com/dxx9kwg6t/" + localStorage.getItem('urlUserImage')}
                sx={{
                  height: 40,
                  width: 40,
                  ml: 1
                }}
            >
            {getInitials(localStorage.getItem('userName'))}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
