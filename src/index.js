import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store/store'

ReactDOM.render(
  <React.Fragment>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.Fragment>,
  document.getElementById('root')
);
