// @packages
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledBackdrop = styled(Backdrop)(() => ({
  backgroundColor: '#ffffff',
}));

const Progress = () => (
  <StyledBackdrop open>
    <CircularProgress size={50} />
  </StyledBackdrop>
);

export default Progress;
