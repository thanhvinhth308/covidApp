import { Box } from '@material-ui/core';
import React from 'react';
import Header from '../Header';

MainLayout.propTypes = {};

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <Box paddingLeft={2} paddingRight={2} paddingBottom={5} style={{ width: `100%` }}>
        {children}
      </Box>
    </div>
  );
}

export default MainLayout;
