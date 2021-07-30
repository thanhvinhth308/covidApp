import { IconButton, InputAdornment, TextField, Typography } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
PasswordField.propTypes = {};

function PasswordField(props) {
  const { field, form, label } = props;
  const { value, name, onBlur, onChange } = field;
  const { errors, touched, isSubmitting } = form;
  const showError = errors[name] && touched[name];
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <div>
      <TextField
        fullWidth
        id={name}
        label={label}
        margin="normal"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
        invalid={String(!!showError)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword} edge="end">
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          )
        }}
        {...field}
      />
      <ErrorMessage name={name}>
        {(msg) => <Typography color="secondary">{msg}</Typography>}
      </ErrorMessage>
    </div>
  );
}

export default PasswordField;
