import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CourseHistory from '../../pages/CourseHistory/CourseHistory';
import AddCourse from '../../pages/AddCourse/AddCourse';
import Roadmap from '../../pages/Roadmap/Roadmap';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { myContext } from '../../context/Context';

const AppRoutes = () => {
  const { user, handleLogin } = useContext(myContext);

  return (
    <Switch>
      <PrivateRoute exact path="/dashboard" user={user} component={Dashboard} />
      <PrivateRoute exact path="/roadmap" user={user} component={Roadmap} />
      <PrivateRoute
        exact
        path="/history"
        user={user}
        component={CourseHistory}
      />
      <PrivateRoute
        exact
        path="/add-course"
        user={user}
        component={AddCourse}
      />

      {user ? (
        <Redirect from="/login" to="/dashboard" />
      ) : (
        <Route exact path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
      )}
    </Switch>
  );
};

export default AppRoutes;
