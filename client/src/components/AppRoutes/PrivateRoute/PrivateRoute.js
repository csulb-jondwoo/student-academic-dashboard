import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            // to={{ pathname: '/login', state: { from: props.location } }}
            to="/login"
          />
        )
      }
      // render={(props) =>
      //   !isLoggedIn && isLoading ? <p>loading...</p> : <Component {...props} />
      // }
    />
  );
};

export default PrivateRoute;

// TODO: components not rendering
