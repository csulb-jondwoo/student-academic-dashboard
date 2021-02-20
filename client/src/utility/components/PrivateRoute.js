import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { myContext } from '../../context/Context';

const PrivateRoute = ({ component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userObj = useContext(myContext);
  console.log(userObj);

  const Component = component;

  useEffect(() => {
    setIsAuthenticated(true);
  }, [userObj]);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default PrivateRoute;

// TODO: PrivateRoute sees userObj as undefined so user gets rerouted to login even tho they logged in
