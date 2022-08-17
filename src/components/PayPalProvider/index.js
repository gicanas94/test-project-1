// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

// @own
import options from './options';

const PayPalProvider = ({ children }) => (
  <PayPalScriptProvider options={options}>{children}</PayPalScriptProvider>
);

PayPalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PayPalProvider;
