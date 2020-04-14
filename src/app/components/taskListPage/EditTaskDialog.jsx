import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { editTaskAction } from '../../actions';
import UserSelect from './UserSelect';


const useStyles = makeStyles({
  card: {
    padding: 20
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: '10px 20px'
  },
  submit: {
    marginTop: 20,
    alignSelf: 'flex-end'
  }
});

const EditTaskDialog = ({ task, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    assignedTo: task.user._id,
    status: task.status
  });


  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeAssignedTo = (assignedTo) => {
    setFormData({ ...formData, assignedTo });
  };

  const handleEditTask = () => {
    dispatch(editTaskAction({
      url: `task?projectId=${task.project}&taskId=${task._id}`,
      formData
    }));

    onClose();
  };

  return (<>
    <DialogTitle id="alert-dialog-slide-title">{'Edit Project'}</DialogTitle>
    <DialogContent>
      <DialogContent>
        <form className={classes.form}>
          <FormControl className={classes.formControl}>
            <FormLabel>Status</FormLabel>
            <RadioGroup name="status" value={formData.status} onChange={handleChangeForm}>
              <FormControlLabel value="open" control={<Radio />} label="Open" />
              <FormControlLabel value="done" control={<Radio />} label="Done" />
            </RadioGroup>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              name='title'
              value={formData.title}
              onChange={handleChangeForm}
              aria-describedby="title-error-text"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              name='description'
              value={formData.description}
              onChange={handleChangeForm}
              aria-describedby="description-error-text"
            />
          </FormControl>
          <UserSelect onChange={handleChangeAssignedTo} defaultValue={task.user._id}/>
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEditTask}
          >Edit Task</Button>
        </form>
      </DialogContent>
    </DialogContent>
  </>);
};

EditTaskDialog.propTypes = {
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
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditTaskDialog;