import { LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: '100vw',
    height: '120vh',
    top: '0',
    left: '0',
    background: 'white',
    opacity: '0.2'
  },
  loading: {
    position: 'absolute',
    // left: "50%",
    top: '50%',
    transform: 'translate(0%,-50%)',
    width: '100vw',
    zIndex: '3'
  }
}));

export default function GlobalLoading() {
  const classes = useStyles();
  const isLoading = useSelector(state => state.GlobalReducer.isLoading);
  return (
    isLoading && (
      <div className={classes.root}>
        <div className={classes.loading}>
          <LinearProgress />
        </div>
      </div>
    )
  );
}
