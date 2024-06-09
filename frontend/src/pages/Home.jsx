import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography, Drawer, Stack,Avatar } from '@mui/material';
import { lightBlack,white } from '../constants/color';
import { Menu as MenuIcon } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import { User, useAuth0 } from '@auth0/auth0-react';



const Home = () => {
  const {user, isAuthenticated, logout } = useAuth0();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const MoveToHandler = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const MenuHandler = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navigateToAboutUs = () => {
    navigate('/about');
    console.log('About Us');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const logoutHandler = () => {
    logout({
      returnTo: 'https://fixit-7m4u.vercel.app/' // Replace with your Vercel-hosted home page URL
    });
  };
  

  return (
    <>
      <Box height={'4rem'} sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{
           bgcolor: isScrolled ? white : lightBlack, 
           py: 1 ,
           color : isScrolled ? lightBlack : white
           }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: {
                md: '0 3rem',
              }
            }}
          >
            <Typography variant="h4" sx={{ cursor: 'pointer' }} onClick={MoveToHandler}>
              <IconButton onClick={MoveToHandler} color="inherit">
                <DisabledByDefaultIcon 
                sx={{ 
                  fontSize: 50,
                   color: isScrolled ? lightBlack : white
                  }}
                   />
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
              <Button variant='contained'   onClick={navigateToAboutUs}
               sx={{ 
                color: isScrolled ? lightBlack : white ,
                bgcolor : isScrolled ? white : lightBlack,
                 textTransform: 'none',
                  fontSize: '20px',
                  marginRight:"2rem",
                  '&:hover' : {
                    bgcolor : 'gray'
                  }
                 }}
              >
                About Us
              </Button>
              {
                isAuthenticated ? (
                  <Button variant='contained'  onClick={logoutHandler} 
                  sx={{ 
                    color: isScrolled ? lightBlack : white ,
                    bgcolor : isScrolled ? white : lightBlack,
                     textTransform: 'none',
                      fontSize: '20px',
                      marginRight:'2rem',
                      '&:hover' : {
                        bgcolor : 'gray'
                      }
                     }}
                     >
                      Logout
                    </Button>
                ) : (
                  <Button onClick={navigateToLogin} 
                  sx={{ 
                    color: isScrolled ? lightBlack : white ,
                    bgcolor : isScrolled ? white : lightBlack,
                     textTransform: 'none',
                      fontSize: '20px',
                      '&:hover' : {
                        bgcolor : 'gray'
                      }
                     }}
                  >
                    Login
                    </Button>
                )
                
              }
            
              {
              
              isAuthenticated && (
                <Avatar 
                sx={{
                    width:50,
                    height:50,
                    ObjectFit:"contain",
                }}
                src={user.picture}
                />
              )
            
           }
            </Box>
             
        
             <Box
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                direction:'column'
              }}
            >
              <IconButton color="inherit" onClick={MenuHandler}>
                <MenuIcon
                 sx={{ 
                  fontSize: 40,
                   color: isScrolled ? lightBlack : white
                   }} 
                 />
              </IconButton>
              {
              
              isAuthenticated && (
                <Avatar 
                sx={{
                    width:50,
                    height:50,
                    ObjectFit:"contain",
                }}
                src={user.picture}
                />
              )
            
           }
            </Box>
          
          </Toolbar>
        </AppBar>
      </Box>

      <Header />

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
            <Button onClick={navigateToAboutUs} variant='contained' 
             sx={{ 
              color:  lightBlack ,
              bgcolor : white ,
               textTransform: 'none',
                fontSize: '20px',
                '&:hover' : {
                  bgcolor : 'gray'
                }
               }}
            >
              About Us
              </Button>
            {
              isAuthenticated ? (
                <Button onClick={logoutHandler} variant='contained'  sx={{ 
                  color:  lightBlack ,
                  bgcolor : white ,
                   textTransform: 'none',
                    fontSize: '20px',
                    '&:hover' : {
                      bgcolor : 'gray'
                    }
                   }}
                   >
                    Logout
                  </Button>
              ) : (
                <Button onClick={navigateToLogin} variant='contained'
                 sx={{ 
                  color:  lightBlack ,
                  bgcolor : white ,
                   textTransform: 'none',
                    fontSize: '20px',
                    '&:hover' : {
                      bgcolor : 'gray'
                    }
                   }}
                   >
                    Login
                  </Button>
              )
            }
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default Home;
