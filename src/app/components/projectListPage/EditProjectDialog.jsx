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

import { editProjectAction } from '../../actions';

const useStyles = makeStyles({
  card: {
    padding: 20
  },
  form: {
    display: 'flex',
    alignItems: 'center'
  },
  formControl: {
    margin: '0 20px'
  },
  submit: {
    alignSelf: 'flex-end'
  }
});

const EditProjectDialog = ({ project, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description
  });


  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditProject = () => {
    dispatch(editProjectAction({
      url: `project/${project._id}`,
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
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            size="small"
            onClick={handleEditProject}
          >Edit Project</Button>
        </form>
      </DialogContent>
    </DialogContent>
  </>);
};

EditProjectDialog.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  }),
  onClose: PropTypes.func
};

export default EditProjectDialog;