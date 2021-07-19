import { Box, Button, Container, Grid, Hidden, Paper, Typography } from '@material-ui/core';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import newApi from '../../apis/newsApi';
import InfoCard from '../../components/InfoCard';
import { checkToken } from '../../utils/localStorage';
import './AllNews.scss';
import ImgCarousel from './components/ImgCarousel';
import NewsList from './components/NewsList';
import NewSkeleton from './components/NewsSkeleton/NewsSkeleton';
function AllNews(props) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getAllNews = async () => {
      setIsLoading(true);
      const res = await newApi.getAllNews();
      setAllNews(res.articles);
      setIsLoading(false);
    };
    try {
      getAllNews();
    } catch (error) {
      alert('Get Data failed,please try again');
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <NewSkeleton />
  ) : (
    <Box paddingTop="65px">
      {!checkToken() ? (
        <Hidden mdDown>
          <ImgCarousel />
        </Hidden>
      ) : null}

      <Box>
        <InfoCard />
      </Box>

      <Container maxWidth="lg">
        <Grid container>
          <Grid item sm={8} xs={12}>
            <NewsList allNews={allNews} />
          </Grid>
          <Grid item sm={4} xs={12} container>
            <Grid item sm={6} xs={6}>
              <Paper>
                <Box textAlign="center">
                  <Progress type="circle" percent={75} strokeColor="" />
                  <Typography variant="body2" color="inherit" className="allNews__more">
                    Recovered Rate
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item sm={6} xs={6}>
              <Paper>
                <Box textAlign="center">
                  <Progress type="circle" percent={75} strokeColor="red" />
                  <Typography variant="body2" color="inherit" className="allNews__more">
                    Recovered Rate
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AllNews;
