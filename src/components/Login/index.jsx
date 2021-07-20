import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../forms/LoginForm';

Login.propTypes = {};

function Login(props) {
  const history = useHistory();
  const [message, setMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAccountCheck = async (formValues) => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    const index = allAccount.findIndex(
      (item) => item.username === username && item.password === password
    );

    if (index > -1) {
      setMessage('');
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
      history.push('/');
    } else {
      setMessage('Tài khoản hoặc mật khẩu không chính xác');
    }
  };
  return (
    <div>
      <LoginForm onAccountCheck={handleAccountCheck} />
      <Typography component="span" color="secondary">
        {message}
      </Typography>
    </div>
  );
}

export default Login;
