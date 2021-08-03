import { Grid, Typography } from '@material-ui/core';
import 'antd/dist/antd.css';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import covidApi from '../../apis/covidApi';
import { GlobalActions } from '../../redux/rootAction';
import DetailCard from './components/DetailCard';

function InfoCard(props) {
  const { t } = useTranslation();
  const language = localStorage.getItem('i18nextLng');
  const [notableNumbers, setNotableNumbers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMount = true;
    covidApi
      .getGlobalSummary()
      .then((res) => {
        const numbers = [
          {
            type: 'card__cases',
            title: t('allNews.infoCard.cases'),
            number: numeral(res.cases).format('0.0a'),
            today: numeral(res.todayCases).format('0.0a'),
          },
          {
            type: 'card__recovered',
            title: t('allNews.infoCard.recovered'),
            number: numeral(res.recovered).format('0.0a'),
            today: numeral(res.todayRecovered).format('0.0a'),
          },
          {
            type: 'card__deaths',
            title: t('allNews.infoCard.deaths'),
            number: numeral(res.deaths).format('0.0a'),
            today: numeral(res.todayDeaths).format('0.0a'),
          },
        ];
        if (isMount) {
          setNotableNumbers(numbers);
        }
      })
      .catch((error) => {
        dispatch(GlobalActions.toggleErrorHandler(true));
      });
    return () => {
      isMount = false;
    };
  }, []);
  useEffect(() => {
    if (notableNumbers.length > 0) {
      const newNumbers = [
        { ...notableNumbers[0], title: t('allNews.infoCard.cases') },
        { ...notableNumbers[1], title: t('allNews.infoCard.recovered') },
        { ...notableNumbers[2], title: t('allNews.infoCard.deaths') },
      ];
      setNotableNumbers(newNumbers);
    }
  }, [language]);

  return (
    <div>
      <Typography variant="h5" component="h5" color="secondary" align="center">
        {t('allNews.infoCard.title')}
      </Typography>
      <Grid container>
        {notableNumbers.map((notableNumber, index) => (
          <Grid key={index} item sm={4} xs={4}>
            <DetailCard notableNumber={notableNumber} />{' '}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
export default InfoCard;
