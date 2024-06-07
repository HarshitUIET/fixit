import React, { useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery, IconButton, Stack } from '@mui/material';
import { lightBlack,  white } from '../constants/color';
import '../animation/Header.css';
import { orange } from '../constants/color';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Test from '../components/specific/Test';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }) => {

    const navigate = useNavigate();
    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleChat = () => {
        navigate('/chat');
    }

    useEffect(() => {
        const texts = document.querySelectorAll('.animated-text');
        texts.forEach(text => {
            const letters = text.textContent.split('');
            text.textContent = '';
            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;
                span.style.animationDelay = `${index * 0.1}s`;
                text.appendChild(span);
            });
        });
    }, []);

    return (
        <>
            <Box
                height='calc(100vh - 4rem)'
                sx={{
                    bgcolor: lightBlack,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <Typography color={white} variant={isMdScreen ? "h2" : "h4"} className="animated-text" style={{ marginBottom: '20px' }}>
                    Fix your Sales
                </Typography>
                <Typography color={white} variant={isMdScreen ? "h1" : "h2"} className="animated-text" style={{ marginBottom: '20px' }}>
                    Enabling Human Intelligence with
                </Typography>
                <Typography color={white} variant={isMdScreen ? "h1" : "h2"} className="animated-text">
                    Artificial Intelligence
                </Typography>
                <Button
                    endIcon={<ArrowForwardIosIcon />}
                    onClick={handleChat}
                    sx={{ color: orange, fontSize: '18px', '&:hover': { color: white } }}
                >
                    See it in actions
                </Button>
            </Box>
            {
                user && <Test />
            }

        </>
    );
};

export default Header;

