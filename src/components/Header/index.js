// @packages
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

// @app
import ROUTES from 'routes';
import useAuthUser from 'hooks/useAuthUser';
import useFirebase from 'hooks/useFirebase';

const Header = () => {
  const { authUser } = useAuthUser();
  const { auth } = useFirebase();

  const handleSignOutButtonClick = () => signOut(auth);

  return (
    <AppBar elevation={0} position="sticky">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="div" sx={{ fontWeight: 'bold' }} variant="h6">
          Argentina Stuff
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            size="large"
            sx={{ marginRight: 2 }}
            to={ROUTES.HOME}
          >
            Home
          </Button>
          {authUser && (
            <>
              <Button
                color="inherit"
                component={Link}
                size="large"
                sx={{ marginRight: 2 }}
                to={ROUTES.ACCOUNT.GENERAL}
              >
                Account
              </Button>
              <Button color="inherit" onClick={handleSignOutButtonClick}>
                Sign out
              </Button>
            </>
          )}
          {!authUser && (
            <Button
              color="inherit"
              component={Link}
              size="large"
              to={ROUTES.SIGN_IN}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
