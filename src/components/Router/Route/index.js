// @packages
import PropTypes from 'prop-types';
import React from 'react';
import { Route as ReactRouterRoute } from 'react-router-dom';

// @app
import useAuthUser from 'hooks/useAuthUser';

// @own
import Progress from './Progress';

const Route = ({
  component,
  componentIfValidationFails,
  exact,
  path,
  validation,
}) => {
  const { authUser, requestingAuthUser } = useAuthUser();

  const route = (
    <ReactRouterRoute component={component} exact={exact} path={path} />
  );

  if (requestingAuthUser) {
    return <Progress />;
  }

  if (validation) {
    return validation({ authUser }) ? route : componentIfValidationFails;
  }

  return route;
};

Route.propTypes = {
  component: PropTypes.func.isRequired,
  componentIfValidationFails: PropTypes.node,
  exact: PropTypes.bool,
  path: PropTypes.string.isRequired,
  validation: PropTypes.func,
};

Route.defaultProps = {
  componentIfValidationFails: <></>,
  exact: false,
  validation: () => true,
};

export default Route;
