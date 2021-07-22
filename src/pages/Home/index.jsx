import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import WorldMap from '../../components/Chart/WorldMap';
import InfoCard from '../../components/InfoCard';
import TableStatistics from '../../components/TableStatistics';
import WorldStatistics from '../../components/WorldStatistics';
import './Home.scss';

function Home(props) {
  const { t } = useTranslation();
  return (
    <Box paddingTop="80px">
      <InfoCard />
      <Paper elevation={10}>
        <p className="home__title">{t('homePage.mapTitle')}</p>
        <Box>
          <WorldMap />
        </Box>
      </Paper>

      <p className="home__title">{t('homePage.graphTitle')}</p>
      <Box>
        <WorldStatistics />
      </Box>

      <Paper elevation={10}>
        <p className="home__title">{t('homePage.tableTitle')}</p>
        <Box>
          <TableStatistics />
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
