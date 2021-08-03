import { Box } from '@material-ui/core';
import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
MainLayout.propTypes = {};

function MainLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <Box paddingLeft={2} paddingRight={2} paddingBottom={3} width="100%">
        {children}
        <Footer />
      </Box>
    </div>
  );
}

export default MainLayout;
