// @packages
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

const ProviderButton = ({ disabled, onClick, provider, sx }) => (
  <Button
    color={provider.color}
    disableElevation
    disabled={disabled}
    fullWidth
    onClick={onClick}
    size="large"
    startIcon={provider.icon}
    sx={sx}
    variant="contained"
  >
    {`Sign in with ${provider.name}`}
  </Button>
);

ProviderButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  provider: PropTypes.shape({
    color: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  sx: PropTypes.objectOf(PropTypes.any),
};

ProviderButton.defaultProps = {
  disabled: false,
  onClick: () => false,
  sx: {},
};

export default ProviderButton;
