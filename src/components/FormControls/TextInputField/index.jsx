import { TextField, Typography } from '@material-ui/core';
import { ErrorMessage } from 'formik';
import React from 'react';

TextInputField.propTypes = {};

function TextInputField(props) {
  const { field, form, label } = props;
  const { value, name, onBlur, onChange } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div>
      <TextField
        fullWidth
        id={name}
        label={label}
        // placeholder={label}
        margin="normal"
        type="text"
        autoComplete="current-password"
        invalid={String(!!showError)}
        {...field}
      />
      <ErrorMessage name={name}>
        {(msg) => <Typography color="secondary">{msg}</Typography>}
      </ErrorMessage>
    </div>
  );
}

export default TextInputField;
