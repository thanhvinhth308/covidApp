import { Grid } from '@material-ui/core';
import 'antd/dist/antd.css';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import covidApi from '../../apis/covidApi';
import DetailCard from './components/DetailCard';

function InfoCard(props) {
  const { t } = useTranslation();
  const [notableNumbers, setNotableNumbers] = useState([]);

  useEffect(() => {
    covidApi.getGlobalSummary().then(res => {
      const numbers = [
        {
          type: 'card__cases',
          title: t('infoCard.cases'),
          number: numeral(res.cases).format('0.0a'),
          today: numeral(res.todayCases).format('0.0a')
        },
        {
          type: 'card__recovered',
          title: t('infoCard.recovered'),
          number: numeral(res.recovered).format('0.0a'),
          today: numeral(res.todayRecovered).format('0.0a')
        },
        {
          type: 'card__deaths',
          title: t('infoCard.deaths'),
          number: numeral(res.deaths).format('0.0a'),
          today: numeral(res.todayDeaths).format('0.0a')
        }
      ];
      setNotableNumbers(numbers);
    });
  }, []);

  useEffect(() => {
    const newNumbers = [
      { ...notableNumbers[0], title: t('infoCard.cases') },
      { ...notableNumbers[1], title: t('infoCard.recovered') },
      { ...notableNumbers[2], title: t('infoCard.deaths') }
    ];
    setNotableNumbers(newNumbers);
  }, [t]);

  return (
    <div>
      <Grid container spacing={1}>
        {notableNumbers.map((notableNumber, index) => (
          <Grid key={index} item sm={4} xs={4}>
            <DetailCard notableNumber={notableNumber} />{' '}
          </Grid>
        ))}
        ;
      </Grid>
    </div>
  );
}
export default InfoCard;
