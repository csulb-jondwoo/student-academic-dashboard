import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App'
import Context from './context/Context'

ReactDOM.render(
  <>
    <Context>
      <App />
    </Context>
  </>,
  document.getElementById('root'),
)
