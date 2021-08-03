import { Avatar, Box, Button, makeStyles, Typography } from '@material-ui/core';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import PasswordField from '../../components/FormControls/PasswordField';
import TextInputField from '../../components/FormControls/TextInputField';
LoginForm.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    height: '100%',
  },
  avatar: {
    margin: '0 auto',
    background: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 4, 0),
    textAlign: 'center',
    fontSize: '20px',
  },
  submit: {
    margin: theme.spacing(4, 0, 3, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function LoginForm(props) {
  const { onAccountCheck, errorMessage } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const initialValues = {
    username: '',
    password: '',
  };
  let validationSchema = yup.object().shape({
    username: yup.string().min(6, t('form.minMes')).required(t('form.reqMes')).typeError(t('form.reqMes')),
    password: yup.string().min(6, t('form.minMes')).required(t('form.reqMes')).typeError(t('form.reqMes')),
  });

  const handleLoginSubmit = (formValue) => {
    if (onAccountCheck) {
      onAccountCheck(formValue);
    }
  };

  return (
    <div className={classes.root}>
      <Avatar className={classes.avatar} />
      <Typography className={classes.title}>{t('form.loginTitle')}</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(formValue) => handleLoginSubmit(formValue)}
      >
        {() => {
          return (
            <Form>
              <FastField name="username" id="username" component={TextInputField} label={t('form.username')} />
              <FastField name="password" id="password" component={PasswordField} label={t('form.password')} />
              <Box width="230px" margin="auto">
                <p>{errorMessage}</p>
              </Box>
              <Button type="submit" variant="contained" color="secondary" className={classes.submit} fullWidth>
                {t('form.loginTitle')}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
