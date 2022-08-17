// @packages
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { Provider as ReactReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

// @own
import App from './components/App';
import AuthUserProvider from './providers/AuthUserProvider';
import FirebaseProvider from './providers/FirebaseProvider';
import PayPalProvider from './providers/PayPalProvider';
import reportWebVitals from './reportWebVitals';
import store from './redux';
import theme from './theme';

ReactDOM.render(
  <ReactReduxProvider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <IntlProvider locale="en">
          <FirebaseProvider>
            <AuthUserProvider>
              <PayPalProvider>
                <App />
              </PayPalProvider>
            </AuthUserProvider>
          </FirebaseProvider>
        </IntlProvider>
      </BrowserRouter>
    </ThemeProvider>
  </ReactReduxProvider>,
  document.getElementById('root')
);

reportWebVitals();
