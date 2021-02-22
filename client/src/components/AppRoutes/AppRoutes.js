import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CourseHistory from '../../pages/CourseHistory/CourseHistory';
import AddCourse from '../../pages/AddCourse/AddCourse';
import Roadmap from '../../pages/Roadmap/Roadmap';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const AppRoutes = ({ user }) => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
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
    </Switch>
  );
};

export default AppRoutes;
