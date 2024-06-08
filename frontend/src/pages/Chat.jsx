import React, { useState } from 'react';
import { questions } from '../constants/questions';
import { Box, Button, Stack, Typography } from '@mui/material';

const Chat = () => {
  const [response, setResponse] = useState('');

  const responseHandler = async (question) => {
    try {
      console.log(encodeURIComponent(question));
      const res = await fetch(`http://127.0.0.1:8000/answer/${encodeURIComponent(question)}`);
      console.log(res);
      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      console.error('Error fetching the response:', error);
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
