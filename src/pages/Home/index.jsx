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
import './Home.scss';

function Home(props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Box paddingTop="80px">
      <InfoCard />
      <Paper elevation={10}>
        <p className="home__title">{t('homePage.mapTitle')}</p>
        <Box margin={2}>
          <WorldMap />
        </Box>
      </Paper>

      <p className="home__title">{t('homePage.graphTitle')}</p>
      <Box margin={2}>
        <WorldStatistics />
      </Box>

      <Paper elevation={10}>
        <p className="home__title">{t('homePage.tableTitle')}</p>
        <Box margin={2}>
          <TableStatistics />
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
