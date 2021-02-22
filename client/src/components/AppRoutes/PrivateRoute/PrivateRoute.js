import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  console.log(isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            // to={{ pathname: '/login', state: { from: props.location } }}
            to="/login"
          />
        )
      }
    />
  );
};

export default PrivateRoute;

// TODO: components not rendering
