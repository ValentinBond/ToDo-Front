import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ReplayIcon from '@material-ui/icons/Replay';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getUserListRequestAction } from '../../actions';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    padding: '0 20px'
  },
  loader: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  selectControl: {
    width: '100%'
  }
});

const UserSelect = ({ onChange, defaultValue }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userList, errors, loading } = useSelector(state => state.user);
  const [value, setValue] = useState(defaultValue || '');

  const loadData = useCallback(async () => {
      dispatch(getUserListRequestAction({
        url: 'user/list'
      }));
  }, [dispatch]);

  const handleChange = (e) => {
    onChange(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div
      className={classes.root}
      style={{
        display: errors ? 'block' : 'flex'
      }}
    >
      {
        !_.size(errors) ?  loading ?
          <div
            className={classes.loader}
          >
            <InputLabel
              id="select-http"
              style={{
                margin: '0 20px 0 0'
              }}
            >Assigned to</InputLabel>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}
            >
              <CircularProgress size={16} style={{
                padding: 0,
                margin: 0
              }}
              />
            </div>
          </div>
          :
          <FormControl
            classes={{
              root: classes.selectControl
            }}
            error={!!_.size(errors)}
          >
            <InputLabel id="select-http">Assigned to</InputLabel>
            <Select
              labelId="select-http"
              value={value}
              onChange={handleChange}
            >
              {
                !_.size(userList) ? <MenuItem value={''}>No Data!</MenuItem> : (
                  _.map(userList, (item) => {
                    return <MenuItem key={item._id} value={item._id}>{item.email}</MenuItem>;
                  })
                )
              }
            </Select>
            {
              _.map(errors, err =>  <FormHelperText>{err}</FormHelperText>)
            }
          </FormControl>
          :
          <>
            <InputLabel
              id="select-http"
              style={{
                color: '#f50057',
                fontSize: 13
              }}
            >Assigned to</InputLabel>
            <Button
              variant="outlined"
              color="secondary"
              onClick={loadData}
              style={{
                paddingTop: 1,
                paddingBottom: 1
              }}
              startIcon={<ReplayIcon />}
            >
              Reload data for select
            </Button>
          </>
      }
    </div>
  );
};

UserSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default UserSelect;