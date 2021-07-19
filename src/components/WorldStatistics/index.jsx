import { Button, ButtonGroup, Grid, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import covidApi from '../../apis/covidApi';
import CircleChart from '../Chart/CircleChart';
import LineChart from '../Chart/LineChart';
import BasicLineChart from '../Chart/BasicLineChart';

WorldStatistics.propTypes = {};

function WorldStatistics(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [worldReport, setWorldReport] = useState([]);
  const [time, setTime] = useState(45);
  const [reportType, setReportType] = useState(45);

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
        alert('Get Data failed,please try again');
        setIsLoading(false);
      });
  }, [time]);

  return (
    <div>
      {isLoading && <LinearProgress />}
      <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button color={reportType === 45 ? 'secondary' : ''} onClick={() => handleTimeChange(45)}>
          45 ngày
        </Button>
        <Button color={reportType === 30 ? 'secondary' : ''} onClick={() => handleTimeChange(30)}>
          30 ngày
        </Button>
        <Button color={reportType === 7 ? 'secondary' : ''} onClick={() => handleTimeChange(7)}>
          7 ngày
        </Button>
      </ButtonGroup>
      <Grid container spacing={3}>
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
