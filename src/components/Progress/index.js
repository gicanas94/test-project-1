// @packages
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(() => ({
  position: 'relative',
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'absolute',
  zIndex: theme.zIndex.drawer + 1,
}));

const Progress = ({ children, open }) => (
  <StyledBox>
    {children}
    <StyledBackdrop open={open}>
      <CircularProgress size={50} />
    </StyledBackdrop>
  </StyledBox>
);

Progress.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};

Progress.defaultProps = {
  open: false,
};

export default Progress;
