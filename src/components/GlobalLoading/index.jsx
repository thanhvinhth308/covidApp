import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100vw',
    height: '120vh',
    top: '0',
    left: '0',
    background: 'white',
    opacity: '0.6',
    zIndex: '10'
  },
  loading: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0%,-50%)',
    width: '100vw',
    textAlign: 'center'
  }
}));

export default function GlobalLoading() {
  const classes = useStyles();
  const isLoading = useSelector((state) => state.GlobalReducer.isLoading);
  return (
    isLoading && (
      <div className={classes.root}>
        <div className={classes.loading}>
          <CircularProgress color="secondary" />
        </div>
      </div>
    )
  );
}
