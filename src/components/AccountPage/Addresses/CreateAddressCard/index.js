// @packages
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(() => ({
  alignItems: 'center',
  borderStyle: 'dashed',
  borderWidth: '3px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: '250px',
  justifyContent: 'center',
}));

const CreateAddressCard = ({ onClick }) => (
  <StyledPaper onClick={onClick} variant="outlined">
    <AddIcon sx={{ color: 'text.secondary', fontSize: '45px' }} />
    <Typography
      color="text.secondary"
      component="h3"
      sx={{ fontWeight: 'bold' }}
      variant="h5"
    >
      Add address
    </Typography>
  </StyledPaper>
);

CreateAddressCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateAddressCard;
