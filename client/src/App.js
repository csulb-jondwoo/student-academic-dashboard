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
import Login from './components/Login/Login';
import CourseHistory from './components/CourseHistory/CourseHistory';

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
            <Route path="/history" exact component={CourseHistory} />
            {/* <Route path="/about" component={About} /> */}
            {/* if you want to pass props to route, render the component */}
            {/* <Route path="/new" render={() => <NewEntry />} /> */}
            {/* <Route path="/new" component={NewEntry} /> */}
            <Redirect to="/dashboard" />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
