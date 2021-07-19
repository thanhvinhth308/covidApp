import { Box } from '@material-ui/core';
import { Card, Skeleton } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import './DetailCard.scss';

function DetailCard(props) {
  // const language = useSelector((state) => state.GlobalReducer.language);
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
