// @packages
import Alert from '@mui/material/Alert';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

// @app
import { closeNotification } from 'redux/notification';
import {
  selectNotificationDuration,
  selectNotificationIsOpen,
  selectNotificationMessage,
  selectNotificationType,
} from 'redux/notification/selectors';

const Notification = () => {
  const dispatch = useDispatch();
  const duration = useSelector(selectNotificationDuration);
  const isOpen = useSelector(selectNotificationIsOpen);
  const message = useSelector(selectNotificationMessage);
  const type = useSelector(selectNotificationType);

  const handleNotificationClose = (_, reason) => {
    if (reason === 'clickaway') return;
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      autoHideDuration={duration}
      onClose={handleNotificationClose}
      open={isOpen}
    >
      <Alert onClose={handleNotificationClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
