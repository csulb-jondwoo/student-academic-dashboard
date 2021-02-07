import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
// import { reducers } from './reducers';
import Context from './context/Context';

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <>
    <Context>
      <App />
    </Context>
  </>,
  document.getElementById('root'),
);
