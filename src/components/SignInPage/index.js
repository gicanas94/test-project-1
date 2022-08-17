// @packages
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import React from 'react';
import Typography from '@mui/material/Typography';

// @own
import SignInWithEmailForm from './SignInWithEmail';
import SignInWithProvider from './SignInWithProvider';

const SignInPage = () => (
  <Container maxWidth="xs">
    <Paper variant="outlined">
      <Box sx={{ padding: 3 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
          }}
          variant="h5"
        >
          Sign in
        </Typography>
        <SignInWithProvider />
        <Divider sx={{ marginBottom: 3 }} variant="middle" />
        <SignInWithEmailForm />
      </Box>
    </Paper>
  </Container>
);

export default SignInPage;
