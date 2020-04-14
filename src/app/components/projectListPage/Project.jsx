import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import { removeProjectAction } from '../../actions/project';
import EditProjectDialog from './EditProjectDialog';

import Transition from '../../../utils/transition';

const useStyles = makeStyles({
  card: {
    margin: '20px 0',
    minWidth: 600,
    position: 'relative',
    height: 'max-content'
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

const Project = ({ project }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveProject = () => {
    dispatch(removeProjectAction({
      url: `project/${project._id}`
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
      <EditProjectDialog project={project} onClose={handleClose}/>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
    <Card className={classes.card}>
      <div className={classes.cardHeader}>
        <CardHeader title={project.title}/>
          <div className={classes.actionBlock}>
            <IconButton
              onClick={handleClickOpen}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleRemoveProject}
            >
              <DeleteIcon />
            </IconButton>
          </div>
      </div>
    <CardContent>
      <p>{project.description}</p>
    </CardContent>
      <CardActions>
        <Link to={`task/${project._id}`}>Details</Link>
      </CardActions>
    </Card>
  </>);
};

Project.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
  })
};

export default Project;