import { Box, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

function NewSkeleton(props) {
  return (
    <div>
      <Box>
        <Grid container>
          {Array.from(new Array(8)).map((x, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box padding={1}>
                <Skeleton variant="rect" width="100%" height={300} />
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
export default NewSkeleton;
