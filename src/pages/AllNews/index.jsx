import {
  Box,
  Chip,
  Container,
  Grid,
  Hidden,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Skeleton } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import newsApi from '../../apis/newsApi';
import InfoCard from '../../components/InfoCard';
import { GlobalActions } from '../../redux/rootAction';
import { checkToken } from '../../utils/helper';
import './AllNews.scss';
import ImgCarousel from './components/ImgCarousel';
import NewsList from './components/NewsList/NewsList';
import NewSkeleton from './components/NewsSkeleton/NewsSkeleton';
import Watch from './components/Watch';

function AllNews(props) {
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getAllNews = async (pagination) => {
    try {
      setIsLoading(true);
      const res = await newsApi.getAllNews(pagination);
      setAllNews(res);
      setIsLoading(false);
    } catch (error) {
      dispatch(GlobalActions.toggleErrorHandler(true));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllNews({ page: 1, limit: 6 });
  }, []);

  return (
    <Box className="allNews" paddingTop="65px">
      {!checkToken() ? (
        <Hidden mdDown>
          <ImgCarousel />
        </Hidden>
      ) : null}
      <Paper>
        <Box>
          <InfoCard />
        </Box>

        <Container maxWidth="lg">
          <Grid container>
            <Grid item sm={12} xs={12}>
              <Box mb={2}>
                <Chip variant="outlined" label={t('allNews.chip.news')} onDelete={() => {}} color="secondary" />
                <Chip variant="outlined" label={t('allNews.chip.covid')} onDelete={() => {}} color="secondary" />
                <Chip variant="outlined" label={t('allNews.chip.sport')} onDelete={() => {}} color="secondary" />
              </Box>
            </Grid>

            <Grid item sm={8} xs={12}>
              {isLoading ? <NewSkeleton /> : <NewsList allNews={allNews} />}
            </Grid>

            <Hidden xsDown>
              <Grid item sm={4} xs={12} container>
                <Grid item sm={12} xs={12}>
                  <Watch />
                  {isLoading ? (
                    <Skeleton paragraph={{ rows: 13 }} active />
                  ) : (
                    <Box>
                      <TableContainer className="allNews__table" component={Paper}>
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Sumary News</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {allNews.map((row) => (
                              <TableRow key={row.title}>
                                <TableCell component="th" scope="row">
                                  <a href={row?.url} target="_blank" rel="noreferrer">
                                    <p>{row.title}</p>
                                  </a>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Container>
      </Paper>
    </Box>
  );
}

export default AllNews;
