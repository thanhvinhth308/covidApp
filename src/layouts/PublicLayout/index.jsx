import { Box } from '@material-ui/core';
import React from 'react';
import { checkToken } from '../../utils/localStorage';
import Header from '../Header';
import PublicHeader from '../PublicHeader';

PublicLayout.propTypes = {};

function PublicLayout({ children }) {
  return (
    <Box display="flex">
      {checkToken() ? <Header /> : <PublicHeader />}
      <Box width="100%">
        <Box style={{ width: `100%` }}>{children}</Box>
      </Box>
    </Box>
  );
}

export default PublicLayout;
