import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'

import Navigation from './components/Navigation/Navigation'
import AppRoutes from './components/AppRoutes/AppRoutes'

import './App.css'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    color: '#2a9d8f',
  },
}))

// app
const App = () => {
  const classes = useStyles()

  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { className: classes.root },
      }}
    >
      <Router>
        <Navigation />
        <Container>
          <AppRoutes />
        </Container>
      </Router>
    </ConfirmProvider>
  )
}

export default App
