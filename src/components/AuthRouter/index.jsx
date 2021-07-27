import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Redirect, Route } from 'react-router-dom';
import { checkToken } from '../../utils/helper';

function AuthRouter({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return !checkToken() ? (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }}
      />
    </div>
  );
}

export default AuthRouter;
