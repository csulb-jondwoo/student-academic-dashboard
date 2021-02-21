import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

// TODO: fix redirect when unauth users access auth routes
