import { Button, ButtonGroup, Grid, LinearProgress, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import covidApi from '../../../../apis/covidApi';
import CircleChart from '../../../../components/Chart/CircleChart';
import CountryMap from '../../../../components/Chart/CountryMap';
import LineChart from '../../../../components/Chart/LineChart';
import { GlobalActions } from '../../../../redux/rootAction';
import CountrySelector from './components/CountrySelector';
StatisticsByCountry.propTypes = {};

function StatisticsByCountry(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { countryName } = useParams();
  const [countries, setCountries] = useState([]);
  const [countryReport, setCountryReport] = useState({});
  const [countryId, setCountryId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(45);

  const handleCountryChange = (event, value) => {
    if (value.country) {
      history.push(`/countries/${value.country}`);
    }
  };

  useEffect(() => {
    try {
      const handleCountriesData = async () => {
        setIsLoading(true);
        const respond = await covidApi.getSummaryAllCountry();
        const countriesData = respond.map((country) => ({
          country: country.country,
          iso2: country.countryInfo.iso2?.toLowerCase(),
          flag: country.countryInfo?.flag,
        }));
        setCountries(countriesData);
        setIsLoading(false);
      };
      handleCountriesData();
    } catch (error) {
      dispatch(GlobalActions.changeApiStatus(true));
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
        .getSummaryByCountry(countryName, time)
        .then((res) => {
          setCountryReport(res);
          setIsLoading(false);
        })
        .catch((error) => {
          dispatch(GlobalActions.changeApiStatus(true));
          setIsLoading(false);
        });
    }
  }, [countries, time, countryName]);

  return (
    <div>
      <CountrySelector onCountryChange={handleCountryChange} countries={countries} />
      {isLoading && <LinearProgress />}
      <Typography variant="h4" component="h4" color="secondary">
        {countryReport?.country}
      </Typography>
      <ButtonGroup size="small" style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button color={time === 45 ? 'secondary' : ''} onClick={() => setTime(45)}>
          45 ngày
        </Button>
        <Button color={time === 30 ? 'secondary' : ''} onClick={() => setTime(30)}>
          30 ngày
        </Button>
        <Button color={time === 7 ? 'secondary' : ''} onClick={() => setTime(7)}>
          7 ngày
        </Button>
      </ButtonGroup>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart report={countryReport?.timeline} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <CircleChart report={countryReport?.timeline} />
        </Grid>
        <Grid item sm={12} xs={12}>
          <CountryMap countryId={countryId} />
        </Grid>
      </Grid>
    </div>
  );
}

export default StatisticsByCountry;
