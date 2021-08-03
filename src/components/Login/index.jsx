import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';

Login.propTypes = {};

function Login(props) {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleAccountCheck = async (formValues) => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    let index = -1;
    if (allAccount) {
      index = allAccount.findIndex((item) => item.username === username && item.password === password);
    }
    if (index > -1) {
      setMessage('');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      enqueueSnackbar(t('form.enqueueSnackbar--login__success'), { variant: 'success' });
      history.push('/');
    } else {
      setMessage(t('form.wrongAccount'));
    }
  };

  return (
    <Box>
      <LoginForm onAccountCheck={handleAccountCheck} errorMessage={message} />
    </Box>
  );
}

export default Login;
