import {
  AppBar,
  Button,
  CssBaseline,
  Dialog,
  DialogContent,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Switch,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../../components/Login';
import Register from '../../components/Register';
import { GlobalActions } from '../../redux/rootAction';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#454242',
  },
  toolbar: {
    justifyContent: 'space-between',
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
  closeButton: {
    justifyContent: 'flex-end',
  },
}));

function PublicHeader(props) {
  const classes = useStyles();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const language = localStorage.getItem('i18nextLng');
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    dispatch(GlobalActions.changeTheme(!darkMode));
  };
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
  const handleLanguageChange = (e) => {
    i18next.changeLanguage(e.target.value);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.right}>
            <FormControl>
              <Select
                onChange={handleLanguageChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                value={language}
                color="secondary"
                style={{ color: 'white' }}
              >
                <MenuItem value="en">EN</MenuItem>
                <MenuItem value="vn">VN</MenuItem>
              </Select>
            </FormControl>
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              name="checkedA"
              inputProps={{ 'aria-label': 'primary checkbox' }}
              color="secondary"
            />
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
          <IconButton className={classes.closeButton} color="secondary" onClick={handleLoginClose}>
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
          <IconButton className={classes.closeButton} color="secondary" onClick={handleRegisterClose}>
            <Close></Close>
          </IconButton>
          <DialogContent>
            <>
              <Register onLoginOpen={handleLoginOpen} onRegisterClose={handleRegisterClose} />
            </>
          </DialogContent>
        </Dialog>
      </AppBar>
    </div>
  );
}

export default PublicHeader;
