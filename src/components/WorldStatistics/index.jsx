import { Box, Button, ButtonGroup, Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import covidApi from '../../apis/covidApi';
import { GlobalActions } from '../../redux/rootAction';
import BasicLineChart from '../Chart/BasicLineChart';
import CircleChart from '../Chart/CircleChart';

WorldStatistics.propTypes = {};

function WorldStatistics(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [worldReport, setWorldReport] = useState([]);
  const [time, setTime] = useState(45);
  const dispatch = useDispatch();

  const handleTimeChange = (time) => {
    setTime(time);
  };

  useEffect(() => {
    setIsLoading(true);
    covidApi
      .getHistoricalGlobalSummary(time)
      .then((res) => {
        setWorldReport(res);
        setIsLoading(false);
      })
      .catch((error) => {
        dispatch(GlobalActions.toggleErrorHandler(true));
        setIsLoading(false);
      });
  }, [time]);

  return (
    <div>
      {isLoading && <LinearProgress color="secondary" />}
      <Box textAlign="center" mb={1}>
        <ButtonGroup size="small">
          <Button color={time === 45 ? 'secondary' : ''} onClick={() => handleTimeChange(45)}>
            45 ngày
          </Button>
          <Button color={time === 30 ? 'secondary' : ''} onClick={() => handleTimeChange(30)}>
            30 ngày
          </Button>
          <Button color={time === 7 ? 'secondary' : ''} onClick={() => handleTimeChange(7)}>
            7 ngày
          </Button>
        </ButtonGroup>
      </Box>
      <Grid container marginBottom={1}>
        <Grid item sm={7} xs={12}>
          <BasicLineChart report={worldReport} />
        </Grid>
        <Grid item sm={5} xs={12}>
          <CircleChart report={worldReport} />
        </Grid>
      </Grid>
    </div>
  );
}

export default WorldStatistics;
