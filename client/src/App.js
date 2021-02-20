import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard/Dashboard';
import CourseHistory from './pages/CourseHistory/CourseHistory';
import AddCourse from './pages/AddCourse/AddCourse';
import NewStudent from './pages/NewStudent/NewStudent';
import Roadmap from './pages/Roadmap/Roadmap';
import PrivateRoute from './utility/components/PrivateRoute';
import { myContext } from './context/Context';

import './App.css';

const App = () => {
  const userObj = useContext(myContext);
  console.log(userObj);

  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/new-student" component={NewStudent} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/roadmap" component={Roadmap} />
            <Route path="/add-course" component={AddCourse} />
            <Route path="/history" component={CourseHistory} />
            <Route path="/new-student" component={NewStudent} />
            <Redirect to="/login" />

            {/* <PrivateRoute path="/dashboard" component={Dashboard} /> */}
            {/* <PrivateRoute path="/roadmap" component={Roadmap} /> */}
            {/* <PrivateRoute path="/add-course" component={AddCourse} /> */}
            {/* <PrivateRoute path="/course-history" component={Dashboard} /> */}
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
