// @packages
import Box from '@mui/material/Box';
import React from 'react';
import { useSelector } from 'react-redux';

// @app
import ConfirmationModal from 'components/ConfirmationModal';
import Header from 'components/Header';
import Notification from 'components/Notification';
import Router from 'components/Router';

const App = () => {
  const notificationProps = useSelector((state) => state.notification);

  return (
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
      <Notification
        duration={notificationProps.duration}
        message={notificationProps.message}
        open={notificationProps.open}
        type={notificationProps.type}
      />
    </>
  );
};

export default App;
