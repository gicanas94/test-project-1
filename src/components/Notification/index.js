// @packages
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch } from 'react-redux';

// @app
import { closeNotification } from 'redux/notification';

const Notification = ({ duration, message, open, type }) => {
  const dispatch = useDispatch();

  const handleNotificationClose = (event, reason) => {
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
      open={open}
    >
      <Alert onClose={handleNotificationClose} severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

Notification.propTypes = {
  duration: PropTypes.number,
  message: PropTypes.string,
  open: PropTypes.bool,
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

Notification.defaultProps = {
  duration: 5000,
  message: '',
  open: false,
  type: 'success',
};

export default Notification;
