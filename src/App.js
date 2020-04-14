import React, { lazy, Suspense, useEffect } from 'react';

import {
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import { makeStyles } from '@material-ui/core/styles';
import socket from './utils/socketInstance';
import axios from './utils/axios';
import { useHistory } from 'react-router-dom';

const Auth = lazy(() => import('./app/components/auth'));
const HomePage = lazy(() => import('./app/components/home'));

const useStyles = makeStyles({
  app: {
    minHeight: '100vh',
    background: 'gainsboro'
  }
});

function App() {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        history.push('/auth');
      }
      throw error;
    });
    return () => socket.disconnect();
  }, [history]);

  return (
    <div className={classes.app}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <PrivateRoute path="/" component={HomePage}/>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
