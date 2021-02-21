import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { myContext } from '../../context/Context';

const PrivateRoute = ({ Component, ...rest }) => {
  const { isAuth } = useContext(myContext);

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
