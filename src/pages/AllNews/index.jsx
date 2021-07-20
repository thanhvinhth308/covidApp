import { Box, Container, Grid, Hidden } from '@material-ui/core';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import newApi from '../../apis/newsApi';
import InfoCard from '../../components/InfoCard';
import { GlobalActions } from '../../redux/rootAction';
import { checkToken } from '../../utils/localStorage';
import './AllNews.scss';
import ImgCarousel from './components/ImgCarousel';
import NewsList from './components/NewsList';
import NewSkeleton from './components/NewsSkeleton/NewsSkeleton';
import Watch from './components/Watch';

const columns = [
  {
    title: 'Sumary News',
    dataIndex: 'title',
    key: 'title',
  },
];

function AllNews(props) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
      dispatch(GlobalActions.changeApiStatus(true));
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
          <Hidden xsDown>
            <Grid item sm={4} xs={12} container>
              <Grid item sm={12} xs={12}>
                <Watch />
                <Table
                  dataSource={allNews}
                  columns={columns}
                  size="middle"
                  bordered
                  color
                  className="allNews__table"
                  pagination={false}
                />
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
}

export default AllNews;
