import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (user ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default PrivateRoute;
