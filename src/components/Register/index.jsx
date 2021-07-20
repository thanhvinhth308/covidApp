import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import RegisterForm from '../../forms/RegisterForm';
Register.propTypes = {};

function Register(props) {
  const { OnRegisterClose } = props;
  const { enqueueSnackbar } = useSnackbar();

  const handleAccountRegister = async formValues => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    if (allAccount) {
      const newAllAccount = [...allAccount, { username: username, password: password }];
      localStorage.setItem('account', JSON.stringify(newAllAccount));
      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
      if (OnRegisterClose) {
        OnRegisterClose();
      }
    } else {
      localStorage.setItem('account', JSON.stringify([{ username: username, password: password }]));
      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });
    }
  };
  return (
    <Box>
      <RegisterForm onAccountRegister={handleAccountRegister} />;
    </Box>
  );
}

export default Register;
