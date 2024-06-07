import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

const Test = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      height={'100vh'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant={isMdScreen ? 'h1' : 'h6'}>
        Analyze your customer conversations in 500+ languages, to get deep insights to shorten sales cycle, increase customer trust, reduce ramp up time & drive more revenue
      </Typography>
    </Box>
  );
};

export default Test;
