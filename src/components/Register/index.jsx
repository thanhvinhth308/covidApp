import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../../forms/RegisterForm';
import SignInBackground from '../../assets/images/background/signInBackground.jpeg';
import { useSnackbar } from 'notistack';
Register.propTypes = {};

function Register(props) {
  const { OnRegisterClose } = props;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleAccountRegister = async (formValues) => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    if (allAccount) {
      const newAllAccount = [...allAccount, { username: username, password: password }];
      localStorage.setItem('account', JSON.stringify(newAllAccount));
      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
      if (OnRegisterClose) {
        OnRegisterClose();
      }
      // history.push('/news');
    } else {
      localStorage.setItem('account', JSON.stringify([{ username: username, password: password }]));
      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
      // history.push('/news');
    }
  };
  return (
    <Box>
      <RegisterForm onAccountRegister={handleAccountRegister} />;
    </Box>
  );
}

export default Register;
