import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { createProjectAction } from '../../actions';
import FormHelperText from '@material-ui/core/FormHelperText';


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

const CreateProjectForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { errors } = useSelector(state => state.project);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });


  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCreateProject = () => {
    dispatch(createProjectAction({
      url: 'project/create',
      formData
    }));

    setFormData({
      title: '',
      description: ''
    });
  };

  const drawError = (filed) => {
    if (errors && errors[filed]) {
      return <FormHelperText id={`${filed}-error-text`}>{errors[filed]}</FormHelperText>;
    }
    return <FormHelperText id={`${filed}-error-text`} />;
  };

  return (
    <Card className={classes.card}>
      <form className={classes.form}>
        <FormControl  error={errors && !!errors.title} className={classes.formControl}>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            name='title'
            value={formData.title}
            onChange={handleChangeForm}
            aria-describedby="title-error-text"
          />
          {drawError('title')}
        </FormControl>
        <FormControl  error={errors && !!errors.description} className={classes.formControl}>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            name='description'
            value={formData.description}
            onChange={handleChangeForm}
            aria-describedby="description-error-text"
          />
          {drawError('description')}
        </FormControl>
        <Button
          className={classes.submit}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleCreateProject}
        >Create New Project</Button>
      </form>
    </Card>
  );
};

export default CreateProjectForm;