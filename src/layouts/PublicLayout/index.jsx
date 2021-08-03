import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { checkToken } from '../../utils/helper';
import Footer from '../Footer';
import Header from '../Header';
import PublicHeader from '../PublicHeader';
PublicLayout.propTypes = {};

function PublicLayout({ children }) {
  return (
    <Paper>
      <Box display="flex">
        {checkToken() ? <Header /> : <PublicHeader />}
        <Box width="100%">
          <Box paddingBottom={2} style={{ width: `100%` }}>
            {children}
            <Footer />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default PublicLayout;
