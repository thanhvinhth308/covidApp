import { Box, Card, CardContent, CardHeader, CircularProgress, Paper } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import('./DetailCard.scss');

function DetailCard(props) {
  const { notableNumber = [] } = props;
  const { t } = useTranslation();

  return (
    <Box className={notableNumber.type}>
      {notableNumber.length ? (
        <CircularProgress color="secondary" />
      ) : (
        <Paper>
          <Card>
            <CardHeader title={notableNumber.title} />
            <CardContent>
              <p color="textSecondary">{notableNumber.number}</p>
              <p>
                +{notableNumber.today} <br></br>
                <span>{t('allNews.infoCard.rate')}</span>
              </p>
            </CardContent>
          </Card>
        </Paper>
      )}
    </Box>
  );
}

export default DetailCard;
