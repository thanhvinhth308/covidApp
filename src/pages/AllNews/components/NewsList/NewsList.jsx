import { Box, CircularProgress, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import newsApi from '../../../../apis/newsApi';
import { GlobalActions } from '../../../../redux/rootAction';
import News from '../News/News';
import './NewsList.scss';

function NewsList(props) {
  const { allNews } = props;
  const [extraNews, setExtraNews] = useState(allNews);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [pagination, setPagination] = useState({ page: 2, limit: 6 });
  const trendNews = extraNews.slice(0, 1)[0];
  const subNews = extraNews.slice(1, 4);
  const otherNews = extraNews.slice(4);
  const dispatch = useDispatch();

  const getAllNews = async (pagination) => {
    try {
      const res = await newsApi.getAllNews(pagination);
      if (res.length === 0) setIsLoadMore(false);
      setExtraNews(extraNews.concat(res));
    } catch (error) {
      dispatch(GlobalActions.toggleErrorHandler(true));
      setIsLoadMore(false);
    }
  };

  useEffect(() => {
    getAllNews(pagination);
  }, [pagination]);

  return (
    <InfiniteScroll
      dataLength={extraNews.length}
      next={() => setPagination({ ...pagination, page: pagination.page + 1 })}
      hasMore={isLoadMore}
      loader={
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      }
      endMessage={
        <Typography align="center" color="secondary">
          You have seen it all
        </Typography>
      }
      style={{ overflowY: 'hidden' }}
    >
      <Box className="newList">
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
                    <a href={trendNews?.url} target="_blank" rel="noreferrer">
                      <p className="newList__title">{trendNews?.title}</p>
                    </a>
                    <p className="newList__description">{trendNews?.description}</p>
                  </Box>
                  <p className="newList__author">{trendNews?.author}</p>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Divider light className="newList__divider" />

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
                        <Image src={item?.urlToImage} alt="not found" width="100%" height="auto" />
                        <a href={item?.url} target="_blank" rel="noreferrer">
                          <p className="newList__title">{item?.title}</p>
                        </a>
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
        <Divider light className="newList__divider" />

        <Paper elevation={5} variant="outlined">
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} container>
              {otherNews.map((news, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <Paper elevation={5} variant="outlined">
                    <News news={news} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Paper>
        <Divider light />
      </Box>
    </InfiniteScroll>
  );
}

export default NewsList;
