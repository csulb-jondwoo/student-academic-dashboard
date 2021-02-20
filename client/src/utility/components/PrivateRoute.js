import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuth, Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />;
        }
      }}
    />
  );
};

export default PrivateRoute;

// TODO: PrivateRoute sees userObj as undefined so user gets rerouted to login even tho they logged in
