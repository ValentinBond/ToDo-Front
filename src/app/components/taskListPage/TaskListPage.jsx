import React, { useEffect } from 'react';

import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskListAction } from '../../actions';
import CreateTaskForm from './CreateTaskForm';
import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from "prop-types";


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

const TaskListPage = ({ match }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { taskList, loading } = useSelector(state => state.task);

  useEffect(() => {
    dispatch(getTaskListAction({
      url: `task/${match.params.id}/list`
    }));

    dispatch({ type: 'START_TASK_CHANNEL', projectId: match.params.id });

    return () => dispatch({ type: 'END_TASK_CHANNEL', projectId: match.params.id });
  }, [dispatch, match.params.id]);

  return (
    <div className={classes.root}>
      <CreateTaskForm projectId={match.params.id}/>
      <div>
        {
          loading ? (
            <div className={classes.loaderWrap}>
              <CircularProgress />
            </div>
          ) : (
            _.size(taskList) ? (
              _.map(taskList, task => <Task key={task._id} task={task}/>)
            ) : (
              <p>Tasks don't exist</p>
            )
          )
        }
      </div>
    </div>
  );
};

TaskListPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default TaskListPage;