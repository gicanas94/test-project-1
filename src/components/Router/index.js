// @packages
import React from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';

// @app
import AccountPage from 'components/AccountPage';
import AddOrEditAddressPage from 'components/AccountPage/Addresses/AddOrEditAddressPage';
import ROUTES from 'routes';
import SignInPage from 'components/SignInPage';

// @own
import Route from './Route';

const Router = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route component={() => <h1>Home</h1>} exact path={ROUTES.HOME} />
      <Route
        component={SignInPage}
        componentIfValidationFails={<Redirect to={ROUTES.HOME} />}
        path={ROUTES.SIGN_IN}
        validation={({ authUser }) => !authUser}
      />
      <Route
        exact
        component={AccountPage}
        componentIfValidationFails={
          <Redirect
            to={{
              pathname: ROUTES.SIGN_IN,
              search: `continue=${location.pathname}`,
            }}
          />
        }
        path={ROUTES.ACCOUNT.ROOT}
        validation={({ authUser }) => authUser}
      />
      <Route
        component={AddOrEditAddressPage}
        componentIfValidationFails={
          <Redirect
            to={{
              pathname: ROUTES.SIGN_IN,
              search: `continue=${location.pathname}`,
            }}
          />
        }
        path={ROUTES.ACCOUNT.ADDRESSES.NEW}
        validation={({ authUser }) => authUser}
      />
      <Route
        component={AddOrEditAddressPage}
        componentIfValidationFails={
          <Redirect
            to={{
              pathname: ROUTES.SIGN_IN,
              search: `continue=${location.pathname}`,
            }}
          />
        }
        path={ROUTES.ACCOUNT.ADDRESSES.EDIT}
        validation={({ authUser }) => authUser}
      />
      <Route component={() => <h1>NotFound</h1>} path={ROUTES.NOT_FOUND} />
    </Switch>
  );
};

export default Router;
