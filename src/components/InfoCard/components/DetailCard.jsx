import { Box } from '@material-ui/core';
import { Card, Skeleton } from 'antd';
import React from 'react';
import './DetailCard.scss';

function DetailCard(props) {
  const { notableNumber } = props;
  return (
    <Box className={notableNumber.type}>
      <Card title={notableNumber.title}>
        {true ? (
          <>
            <p>{notableNumber.number}</p>
            <p>
              <p>
                +{notableNumber.today} <br></br>
                <span>ca/ngày</span>
              </p>
            </p>
          </>
        ) : (
          <Skeleton className="cardskeleton" active />
        )}
      </Card>
    </Box>
  );
}

export default DetailCard;
