import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { checkToken } from '../../utils/helper';
PrivateRouter.propTypes = {};

function PrivateRouter({ component: Component, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          checkToken() ? (
            <MainLayout>
              <Component {...props} />
            </MainLayout>
          ) : (
            <Redirect to={{ pathname: '/news', state: { from: props.location } }} />
          )
        }
      />
    </div>
  );
}

export default PrivateRouter;
