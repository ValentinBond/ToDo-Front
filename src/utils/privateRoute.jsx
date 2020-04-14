import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return localStorage.getItem('token') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={'/auth'}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default PrivateRoute;