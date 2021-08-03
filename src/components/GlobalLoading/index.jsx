import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    background: 'pink',
    zIndex: '10',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '100vw',
    textAlign: 'center',
  },
}));

export default function GlobalLoading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.loading}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
}
