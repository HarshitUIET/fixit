import React, { useState } from 'react';
import axios from 'axios';
import { questions } from '../constants/questions';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Chat = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [response, setResponse] = useState('');

  const responseHandler = async (question) => {
    try {
      const token = await getAccessTokenSilently();
      console.log('Token:', token);
      const encodedQuestion = encodeURIComponent(question);
      console.log('Encoded Question:', encodedQuestion);
      
      const res = await axios.get(`https://fixit-zdxv.vercel.app/answer/${encodedQuestion}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response Data:', res.data);
      setResponse(res.data.answer);
      
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };

  return (
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '4rem',
      }}
    >
      <Typography variant='h4'>
        Try Asking Questions
      </Typography>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          marginTop: '4rem',
        }}
      >
        {questions.map((question) => (
          <Button
            onClick={() => responseHandler(question)}
            variant='contained'
            key={question}
            sx={{
              marginLeft: 4,
              py: 2,
              marginTop: {
                xs: 2,
                md: 0,
              },
            }}
          >
            {question}
          </Button>
        ))}
      </Stack>
      <Box
        height={'40vh'}
        width={'80vw'}
        sx={{
          textAlign: 'center',
          marginTop: '2rem',
        }}
      >
        <Typography variant='h4'>
          {response}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Chat;
