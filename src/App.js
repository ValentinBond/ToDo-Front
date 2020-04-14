import React, { lazy, Suspense } from 'react';

import {
  Switch,
  Route
} from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import { makeStyles } from '@material-ui/core/styles';

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
