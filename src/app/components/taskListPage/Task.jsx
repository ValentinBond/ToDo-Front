import React from 'react';

import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import RowingIcon from '@material-ui/icons/Rowing';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import { useDispatch } from 'react-redux';

import { removeTaskAction } from '../../actions';
import Transition from '../../../utils/transition';
import EditTaskDialog from './EditTaskDialog';

const useStyles = makeStyles({
  card: {
    margin: '20px 0',
    minWidth: 600,
    width: 600,
    height: 'max-content',
    position: 'relative'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  cardHeader: {
    width: '100%',
    background: '#2a846f'
  },
  actionBlock: {
    position: 'absolute',
    top: 10,
    right: 10
  }
});


const Task = ({ task }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const statusList = {
    open: <RowingIcon color="primary" />,
    done: <DoneIcon style={{ color: green[500] }}/>
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveTask = () => {
    dispatch(removeTaskAction({
      url: `task?projectId=${task.project}&taskId=${task._id}`
    }));
  };

  return  (<>
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <EditTaskDialog task={task} onClose={handleClose}/>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <CardHeader title={task.title}/>
        <div className={classes.actionBlock}>
          <IconButton
            onClick={handleClickOpen}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={handleRemoveTask}
            className={classes.delete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <CardContent>
        <p>{task.description}</p>
        <div className={classes.cardFooter}>
          <span>Assigned to: <b>{task.user.email}</b></span>
          <span>Status is {task.status} {statusList[task.status]}</span>
        </div>
      </CardContent>
    </Card>
  </>);
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    project: PropTypes.string,
    user: PropTypes.shape({
      _id: PropTypes.string,
      email: PropTypes.string
    })
  })
};

export default Task;