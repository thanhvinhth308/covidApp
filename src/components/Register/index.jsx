import { Box } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RegisterForm from '../../forms/RegisterForm';
Register.propTypes = {};

function Register(props) {
  const { onRegisterClose, onLoginOpen } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleAccountRegister = async (formValues) => {
    const { username, password } = formValues;
    const allAccount = JSON.parse(localStorage.getItem('account'));
    if (allAccount) {
      const newAllAccount = [...allAccount, { username: username, password: password }];
      localStorage.setItem('account', JSON.stringify(newAllAccount));
      enqueueSnackbar(t('form.enqueueSnackbar--register__success'), { variant: 'success' });
      if (onRegisterClose) {
        onRegisterClose();
      }
      if (onLoginOpen) {
        onLoginOpen();
      }
    } else {
      localStorage.setItem('account', JSON.stringify([{ username: username, password: password }]));
      enqueueSnackbar(t('form.enqueueSnackbar--register__success'), { variant: 'success' });
      if (onRegisterClose) {
        onRegisterClose();
      }
      if (onLoginOpen) {
        onLoginOpen();
      }
    }
  };

  return (
    <Box>
      <RegisterForm onAccountRegister={handleAccountRegister} />
    </Box>
  );
}

export default Register;
