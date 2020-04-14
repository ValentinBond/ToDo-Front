import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';


import { SWITCH_AUTH } from '../../constants';
import { registrationRequestAction, logInRequestAction } from '../../actions/';


const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'gainsboro'
  },
  card: {
    minWidth: 275,
    minHeight: 275,
    padding: 20
  },
  title: {
    fontSize: 19,
    fontWeight: 900
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20
  },
  formControl: {
    margin: '10px 0'
  }
});

const AuthComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.errors);
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChangeForm = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    isLogin ?
      dispatch(logInRequestAction({
        url: 'user/login',
        formData,
        history
      }))
      :
      dispatch(registrationRequestAction({
        url: 'user/registration',
        formData,
        history
      }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const drawError = (filed) => {
    if (errors && errors[filed]) {
      return <FormHelperText id={`${filed}-error-text`}>{errors[filed]}</FormHelperText>;
    }
    return <FormHelperText id={`${filed}-error-text`} />;
  };

  const handleSwitchAuth = () => {
    dispatch({ type: SWITCH_AUTH });
    setFormData({
      email: '',
      password: ''
    });
    setIsLogin(!isLogin);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            { isLogin ? 'Sign in' : 'Registration' }
          </Typography>
          <form className={classes.form} onSubmit={handleSubmitForm}>
            <FormControl error={errors && !!errors.email} className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                name='email'
                value={formData.email}
                onChange={handleChangeForm}
                aria-describedby="email-error-text"
              />
              {drawError('email')}
            </FormControl>
            <FormControl error={errors && !!errors.password} className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password-input"
                name='password'
                aria-describedby="password-error-text"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChangeForm}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {drawError('password')}
            </FormControl>
            <CardActions className={classes.cardActions}>
              <Button
                href="#text-buttons"
                color="primary"
                onClick={handleSwitchAuth}
              >
                {isLogin ? 'Registration' : 'Sing in'}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="primary"
                type="submit"
              >{ isLogin ? 'Sing in' : 'Registration' }</Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthComponent;