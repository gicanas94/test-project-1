// @packages
import Box from '@mui/material/Box';
import React from 'react';

// @app
import ConfirmationModal from 'components/ConfirmationModal';
import Header from 'components/Header';
import Notification from 'components/Notification';
import Router from 'components/Router';

const App = () => (
  <>
    <Header />
    <Box
      sx={{
        paddingBottom: { xs: 2, sm: 3, md: 4 },
        paddingTop: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Router />
    </Box>
    <ConfirmationModal />
    <Notification />
  </>
);

export default App;
