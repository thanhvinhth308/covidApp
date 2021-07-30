import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import covidApi from '../../../../apis/covidApi';
import AreaChart from '../../../../components/Chart/AreaChart';
import CircleChart from '../../../../components/Chart/CircleChart';
import CountryMap from '../../../../components/Chart/CountryMap';
import LineChart from '../../../../components/Chart/LineChart';
import { GlobalActions } from '../../../../redux/rootAction';
import { filterCountryReport } from '../../../../utils/helper';
import CountrySelector from './components/CountrySelector';
import './StatisticByCountry.scss';
const { RangePicker } = DatePicker;

function StatisticsByCountry(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { countryName } = useParams();
  const { t } = useTranslation();

  const [countries, setCountries] = useState([]);
  const [countryReportRes, setCountryReportRes] = useState({});
  const [countryReport, setCountryReport] = useState({});
  const [countryId, setCountryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [endedDataDate, setEndedDataDate] = useState('7/30/21');
  const [startedDate, setStartedDate] = useState('7/20/21');
  const [endedDate, setEndedDate] = useState('7/30/21');

  const handleCountryChange = (event, value) => {
    if (value?.country) {
      history.push(`/countries/${value.country}`);
    }
  };
  const handleDatePicker = (moment, date) => {
    const startedTime = date[0].replace(/(^|-)0+/g, '$1').replace(/-/g, '/');
    const endedTime = date[1].replace(/(^|-)0+/g, '$1').replace(/-/g, '/');
    setStartedDate(startedTime);
    setEndedDate(endedTime);
    setCountryReport(filterCountryReport(countryReportRes.timeline, startedTime, endedTime));
  };
  const handleCountriesData = async () => {
    setIsLoading(true);
    const respond = await covidApi.getSummaryAllCountry();
    const countriesData = respond.map((country) => ({
      country: country.country,
      iso2: country.countryInfo.iso2?.toLowerCase(),
      flag: country.countryInfo?.flag
    }));
    setCountries(countriesData);
    setIsLoading(false);
  };

  useEffect(() => {
    try {
      handleCountriesData();
    } catch (error) {
      dispatch(GlobalActions.toggleErrorHandler(true));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (countryName) {
      setIsLoading(true);
      history.push(`/countries/${countryName}`);
      const selectedCountry = countries.find((country) => country.country === countryName);
      setCountryId(selectedCountry?.iso2);
      covidApi
        .getSummaryByCountry(countryName, 'all')
        .then((res) => {
          setCountryReportRes(res);
          const endedDateRes = Object.keys(res.timeline.cases).pop();
          setEndedDate(endedDateRes);
          setEndedDataDate(endedDateRes);
          setCountryReport(filterCountryReport(res.timeline, startedDate, endedDateRes));
          setIsLoading(false);
        })
        .catch((error) => {
          dispatch(GlobalActions.toggleErrorHandler(true));
          setIsLoading(false);
        });
    }
  }, [countries, countryName]);

  return (
    <div className="statisticsByCountry__content">
      <CountrySelector onCountryChange={handleCountryChange} countries={countries} />
      {isLoading && <LinearProgress color="secondary" />}
      <Typography variant="h4" component="h4" color="secondary">
        {countryReportRes?.country}
      </Typography>
      <p>{t('detailPage.infoDateData') + ':' + moment(endedDataDate).format('MM-DD-YYYY')}</p>

      <Box>
        <Space direction="vertical" size={12}>
          <RangePicker
            value={[moment(startedDate, 'MM/DD/YY'), moment(endedDate, 'MM/DD/YY')]}
            format="MM-DD-YY"
            disabled={[false, false]}
            onChange={handleDatePicker}
          />
        </Space>
      </Box>

      {Object.keys(countryReportRes).length && Object.keys(countryReport).length ? (
        <Grid container>
          <Grid item sm={6} xs={12}>
            <LineChart report={countryReport?.timeline} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CircleChart report={countryReport?.timeline} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <AreaChart report={countryReport?.timeline} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CountryMap countryId={countryId} />
          </Grid>
        </Grid>
      ) : (
        <Box>No data</Box>
      )}
    </div>
  );
}

export default StatisticsByCountry;
