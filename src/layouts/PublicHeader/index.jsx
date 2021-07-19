// import AppBar from '../components/AppBar';
// import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import { AppBar, Button, Dialog, DialogContent, IconButton, Toolbar } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Login from '../../components/Login';
import Register from '../../components/Register';

const styles = (theme) => ({
  appBar: {
    backgroundColor: '#28282a',
  },
  title: {
    fontSize: 24,
  },
  // placeholder: toolbarStyles(theme).root,
  placeholder: {},
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function PublicHeader(props) {
  const { classes } = props;
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { t } = useTranslation();

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };
  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };
  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };
  const handleRegisterClose = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.right}>
            <Button color="inherit" onClick={handleLoginOpen}>
              {t('form.loginTitle')}
            </Button>
            <Button color="inherit" onClick={handleRegisterOpen}>
              {t('form.registerTitle')}
            </Button>
          </div>
        </Toolbar>
        <Dialog
          open={isLoginOpen}
          onClose={handleLoginClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <IconButton className={classes.closeButton} onClick={handleLoginClose}>
            <Close></Close>
          </IconButton>
          <DialogContent>
            <>
              <Login />
            </>
          </DialogContent>
        </Dialog>
        <Dialog
          open={isRegisterOpen}
          onClose={handleRegisterClose}
          aria-labelledby="form-dialog-title"
          disableBackdropClick
          disableEscapeKeyDown
        >
          <IconButton className={classes.closeButton} onClick={handleRegisterClose}>
            <Close></Close>
          </IconButton>
          <DialogContent>
            <>
              <Register OnRegisterClose={handleRegisterClose} />
            </>
          </DialogContent>
        </Dialog>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

PublicHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublicHeader);
