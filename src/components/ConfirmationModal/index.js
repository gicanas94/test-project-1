// @packages
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// @app
import Modal from 'components/Modal';
import useConfirmationModal from 'hooks/useConfirmationModal';

const StyledActionsBox = styled(Box)(() => ({
  textAlign: 'right',
}));

const ConfirmationModal = ({
  acceptButtonText,
  cancelButtonText,
  content,
  title,
}) => {
  const {
    confirmConfirmationModal,
    confirmationModalIsOpened,
    declineConfirmationModal,
  } = useConfirmationModal();

  return (
    <Modal
      maxWidth="sm"
      onClose={declineConfirmationModal}
      open={confirmationModalIsOpened}
      showCloseIcon={false}
    >
      <Typography
        component="h2"
        sx={{ fontWeight: 'bold', marginBottom: 3 }}
        variant="h6"
      >
        {title}
      </Typography>
      <Typography sx={{ marginBottom: 6 }}>{content}</Typography>
      <StyledActionsBox>
        <Button
          disableElevation
          onClick={declineConfirmationModal}
          size="large"
          sx={{ marginRight: 3 }}
          type="button"
          variant="text"
        >
          {cancelButtonText}
        </Button>
        <Button
          disableElevation
          onClick={confirmConfirmationModal}
          size="large"
          type="button"
          variant="contained"
        >
          {acceptButtonText}
        </Button>
      </StyledActionsBox>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  acceptButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  acceptButtonText: 'Accept',
  cancelButtonText: 'Cancel',
  content: '',
  title: '',
};

export default ConfirmationModal;
