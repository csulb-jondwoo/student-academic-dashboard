import React from 'react';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CourseHistory from './pages/CourseHistory/CourseHistory';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AddCourse from './pages/AddCourse/AddCourse';
import NewStudent from './pages/NewStudent/NewStudent';
import Roadmap from './pages/Roadmap/Roadmap';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/history" exact component={CourseHistory} />
            <Route path="/add-course" exact component={AddCourse} />
            <Route path="/new-student" exact component={NewStudent} />
            <Route path="/roadmap" exact component={Roadmap} />
            {/* if you want to pass props to route, render the component */}
            {/* <Route path="/new" render={() => <NewEntry />} /> */}
            {/* <Route path="/new" component={NewEntry} /> */}
            <Redirect to="/login" />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
