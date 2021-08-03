import { Box } from '@material-ui/core';
import React from 'react';
import StatisticsByCountry from './components/StatisticsByCountry/StatisticsByCountry';
DetailCountry.propTypes = {};

function DetailCountry(props) {
  return (
    <Box paddingTop="80px">
      <StatisticsByCountry />
    </Box>
  );
}
export default DetailCountry;
