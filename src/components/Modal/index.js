// @packages
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import ModalMUI from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Portal from '@mui/material/Portal';
import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(() => ({
  left: '50%',
  outline: 0,
  position: 'absolute',
  top: '40%',
  transform: 'translate(-50%, -50%)',
}));

const StyledPaper = styled(Paper)(() => ({
  position: 'relative',
}));

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  cursor: 'pointer',
  position: 'absolute',
  right: theme.spacing(3),
  top: theme.spacing(3),
  zIndex: theme.zIndex.modal,
}));

const Modal = ({ children, maxWidth, onClose, open, showCloseIcon }) => (
  <Portal container={document.body}>
    <ModalMUI onClose={onClose} open={open}>
      <StyledContainer maxWidth={maxWidth}>
        <StyledPaper variant="outlined">
          {showCloseIcon && <StyledCloseIcon onClick={onClose} />}
          <Box sx={{ padding: 3 }}>{children}</Box>
        </StyledPaper>
      </StyledContainer>
    </ModalMUI>
  </Portal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  showCloseIcon: PropTypes.bool,
};

Modal.defaultProps = {
  open: false,
  showCloseIcon: true,
};

export default Modal;
