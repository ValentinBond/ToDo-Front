import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../src/utils/materialTheme';
import {
  BrowserRouter as Router
} from 'react-router-dom';

dotenvExpand(dotenv.config());

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
