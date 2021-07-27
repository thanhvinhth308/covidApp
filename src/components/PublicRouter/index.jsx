import React from 'react';
import { Route } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';

PublicRouter.propTypes = {};

function PublicRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <PublicLayout>
          <Component {...props} />
        </PublicLayout>
      )}
    />
  );
}

export default PublicRouter;
