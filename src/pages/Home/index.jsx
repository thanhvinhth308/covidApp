import { Box, Paper, Typography } from '@material-ui/core';
import i18next from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import WorldMap from '../../components/Chart/WorldMap';
import InfoCard from '../../components/InfoCard';
import TableStatistics from '../../components/TableStatistics';
import WorldStatistics from '../../components/WorldStatistics';
import { GlobalActions } from '../../redux/rootAction';

function Home(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Box paddingTop="80px">
      <InfoCard />
      <Paper elevation={10}>
        <Typography variant="h4" component="h4" color="secondary" align="center">
          {t('homePage.mapTitle')}
        </Typography>
        <Box margin={2}>
          <WorldMap />
        </Box>
      </Paper>

      <Typography variant="h4" component="h4" color="secondary" align="center">
        {t('homePage.graphTitle')}
      </Typography>
      <Box margin={2}>
        <WorldStatistics />
      </Box>

      <Paper elevation={10}>
        <Typography variant="h4" component="h4" color="secondary" align="center">
          {t('homePage.tableTitle')}
        </Typography>
        <Box margin={2}>
          <TableStatistics />
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
