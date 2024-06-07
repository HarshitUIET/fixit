import React, { useState } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Drawer, Stack } from '@mui/material';
import { lightBlack } from '../constants/color';
import { Logout, Menu as MenuIcon } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useNavigate } from 'react-router-dom';

const Home = ({user,setUser}) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  

  const MenuHandler = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateToAboutUs = () => {
    navigate('/about');
    console.log('About Us');
  };

  const navigateToLogin = () => {
    navigate('/login');
  }

  const LogoutHandler = () => {
       setUser(false);
      console.log('Logged out');
  }

  

  return (
    <>
      <Box height={'4rem'} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: lightBlack }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0 3rem ',
            }}
          >
            <Typography variant="h6">
              <IconButton color="inherit">
                <DisabledByDefaultIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
              fiXit
            </Typography>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
              }}
            >
              <Button onClick={navigateToAboutUs} sx={{ color: 'white', marginRight: '2rem', textTransform: 'none' }}>About Us</Button>
              {
                user ? (
                  <Button onClick={LogoutHandler} sx={{ color: 'white', textTransform: 'none' }}>Logout</Button>
                ) : (
                  <Button onClick={navigateToLogin} sx={{ color: 'white', textTransform: 'none' }}>Login</Button>
                )
              }
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'block',
                  md: 'none',
                },
              }}
            >
              <IconButton color="inherit" onClick={MenuHandler}>
                <MenuIcon sx={{ fontSize: 40, color: 'white' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Drawer anchor="right" open={drawerOpen} onClose={MenuHandler}>
        <Box
          sx={{
            width: 250,
            padding: 2,
            bgcolor: lightBlack,
            height: '100%', 
          }}
          role="presentation"
          onClick={MenuHandler}
          onKeyDown={MenuHandler}
        >
          <Stack spacing={2}>
            <Button onClick={navigateToAboutUs} variant='contained'  sx={{ color: 'white', textTransform: 'none' }}>About Us</Button>
             {
                user ? (
                  <Button onClick={LogoutHandler} variant='contained'  sx={{ color: 'white', textTransform: 'none' }}>Logout</Button>
                ) : (
                  <Button onClick={navigateToLogin} variant='contained'  sx={{ color: 'white', textTransform: 'none' }}>Login</Button>
                )
             }
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Home;
