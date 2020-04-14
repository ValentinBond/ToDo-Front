import React, { lazy, Suspense, useEffect } from 'react';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import PrivateRoute from '../../../utils/privateRoute';
import axios from "../../../utils/axios";
import socket from "../../../utils/socketInstance";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  loaderWrap: {
    padding: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const ProjectListPage = lazy(() => import('../projectListPage'));
const TaskListPage = lazy(() => import('../taskListPage'));

const HomePageComponent = ({ history }) => {
  const classes = useStyles();

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
  const logout = () => {
    localStorage.removeItem('token');
    history.push('/auth');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TODO
          </Typography>
          <Button
            color="inherit"
            onClick={logout}
          >Logout</Button>
        </Toolbar>
      </AppBar>
      <div>
        <Router>
          <Suspense fallback={ <div className={classes.loaderWrap}>
            <CircularProgress />
          </div>}>
            <Switch>
              <PrivateRoute path="/task/:id" component={TaskListPage}/>
              <PrivateRoute path="/" component={ProjectListPage}/>
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
};

HomePageComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default HomePageComponent;