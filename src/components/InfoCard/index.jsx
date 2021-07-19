import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _, { set } from 'lodash';
import numeral from 'numeral';
import covidApi from '../../apis/covidApi';
import DetailCard from './components/DetailCard';
import { Grid } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useSelector } from 'react-redux';

function InfoCard(props) {
  const { t } = useTranslation();
  const language = useSelector((state) => state.GlobalReducer.language);
  console.log('🚀 ~ file: index.jsx ~ line 17 ~ InfoCard ~ language', language);

  const [notableNumbers, setNotableNumbers] = useState([]);

  useEffect(() => {
    covidApi.getGlobalSummary().then((res) => {
      const numbers = [
        {
          type: 'card__cases',
          title: t('infoCard.cases'),
          // title: 'CA BÊNH',
          number: numeral(res.cases).format('0.0a'),
          today: numeral(res.todayCases).format('0.0a'),
        },
        {
          type: 'card__recovered',
          title: t('infoCard.recovered'),
          // title: 'ĐÃ KHỎI',
          number: numeral(res.recovered).format('0.0a'),
          today: numeral(res.todayRecovered).format('0.0a'),
        },
        {
          type: 'card__deaths',
          title: t('infoCard.deaths'),
          // title: 'CA CHẾT',
          number: numeral(res.deaths).format('0.0a'),
          today: numeral(res.todayDeaths).format('0.0a'),
        },
      ];
      setNotableNumbers(numbers);
    });
  }, []);

  useEffect(() => {
    const newNumbers = [
      { ...notableNumbers[0], title: t('infoCard.cases') },
      { ...notableNumbers[1], title: t('infoCard.recovered') },
      { ...notableNumbers[2], title: t('infoCard.deaths') },
    ];
    setNotableNumbers(newNumbers);
  }, [language]);

  return (
    <div>
      <Grid container spacing={1}>
        {notableNumbers.map((notableNumber) => (
          <Grid item sm={4} xs={4} key={notableNumber.type}>
            <DetailCard notableNumber={notableNumber} />{' '}
          </Grid>
        ))}
        ;
      </Grid>
    </div>
  );
}
export default InfoCard;
