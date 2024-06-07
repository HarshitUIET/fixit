import { Skeleton } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';


export const LayoutLoader = () => {
      return (
        <Box
          sx={{
            p: 2,
            width: '100%',
            height: '100vh',
          }}
        >
          <Skeleton
            variant="rectangular"
            width={'100%'}
            height={'100%'}
          />
        </Box>
      );
}
    