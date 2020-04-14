import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import CreateProjectForm from './CreateProjectForm';
import Project from './Project';

import { getProjectListAction } from '../../actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0'
  },
  loaderWrap: {
    padding: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


const ProjectListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectList, loading } = useSelector(state => state.project);

  useEffect(() => {
    dispatch(getProjectListAction({
      url: 'project/list'
    }));
    dispatch({ type: 'START_CHANNEL', payload: { data: '312312' } });
    return () => dispatch({ type: 'END_CHANNEL' });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <CreateProjectForm />
      <div>
        {
          loading ? (
              <div className={classes.loaderWrap}>
                <CircularProgress />
              </div>
          ) : (
            _.size(projectList) ? (
              _.map(projectList, (project) => {
                return <Project project={project} key={project._id}/>;
              })
            ) : (
              <p>Projects don't exist</p>
            )
          )
        }
      </div>
    </div>
  );
};

export default ProjectListPage;