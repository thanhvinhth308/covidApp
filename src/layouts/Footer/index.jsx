import { Avatar, Box, Typography } from '@material-ui/core';
import React from 'react';
import logo3 from '../../assets/images/covid/logo3.png';
Footer.propTypes = {};

function Footer(props) {
  return (
    <Box paddingTop={3}>
      <Avatar style={{ margin: 'auto' }} sizes="large" alt="Not found" src={logo3} />
      <Typography align="center">LÊ THÀNH VINH</Typography>
    </Box>
  );
}

export default Footer;
