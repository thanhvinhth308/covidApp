import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import bg1Image from '../../assets/images/background/bg1.jpg';

function NotFound() {
  return (
    <Box
      minHeight="100vh"
      textAlign="center"
      paddingTop="30vh"
      style={{
        backgroundImage: `url(${bg1Image})`,
        backgroundPosition: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box>
        <Typography color="secondary">Trang này không hiển thị</Typography>
        <Typography color="secondary">Có thể liên kết đã hỏng hoặc trang đã bị gỡ</Typography>
        <Typography color="secondary">Hay kiểm tra lại liên kết mà bạn đang mở có chính xác không</Typography>
        <NavLink to="/">
          <Button variant="contained" color="secondary">
            Quay về
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
}
export default NotFound;
