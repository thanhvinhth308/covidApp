import { Box, Divider, Grid, Paper } from '@material-ui/core';
import { Image } from 'antd';
import React from 'react';
import News from './News';
import './NewsList.scss';
function NewsList(props) {
  const { allNews } = props;
  const trendNews = allNews.slice(0, 1)[0];
  const subNews = allNews.slice(1, 4);
  const otherNews = allNews.slice(4);

  return allNews ? (
    <Box>
      <Paper elevation={5} variant="outlined">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} container>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <Box minHeight="220px" padding={1} overflow="hidden">
                <Image src={trendNews?.urlToImage} alt="not found" width="100%" height="auto" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Box
                minHeight="220px"
                padding={1}
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="100%"
              >
                <Box>
                  <p className="newList__title">{trendNews?.title}</p>
                  <p className="newList__description">{trendNews?.description}</p>
                </Box>
                <p className="newList__author">{trendNews?.author}</p>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Divider light />
      <Paper elevation={5} variant="outlined">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} container>
            {subNews.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={12} lg={4}>
                <Paper elevation={4} className="subNews__paper">
                  <Box
                    height="100%"
                    minHeight="200px"
                    padding={1}
                    overflow="hidden"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <Box>
                      <p className="newList__title">{item?.title}</p>
                      <p className="newList__description">{item?.description}</p>
                    </Box>
                    <p className="newList__author">{item?.author}</p>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Divider light />
      <Paper elevation={5} variant="outlined">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} container>
            {otherNews.map((news, index) => (
              <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                <News news={news} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <Divider light />
    </Box>
  ) : (
    <></>
  );
}

export default NewsList;
