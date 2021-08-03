import { Avatar, Box, Paper } from '@material-ui/core';
import React from 'react';
import './News.scss';

function News(props) {
  const { news } = props;

  return (
    <Paper elevation={4} className="news">
      <Box padding={1} display="flex">
        <Avatar className="news__avatar" variant="square" alt="Not found" src={news?.urlToImage} />
        <Box className="news__box" paddingLeft={2}>
          <a href={news?.url} target="_blank" rel="noreferrer">
            <p className="news__title">{news.title}</p>
          </a>
          <p className="news__description">{news.description}</p>
          <p className="news__author">{news.author}</p>
        </Box>
      </Box>
    </Paper>
  );
}

export default News;
