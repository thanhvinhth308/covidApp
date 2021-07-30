import React from 'react';
import ScrollToTop from 'react-scroll-up';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Hidden, Paper } from '@material-ui/core';
ScrollUpButton.propTypes = {};

function ScrollUpButton(props) {
  return (
    <Hidden mdDown>
      <ScrollToTop showUnder={50} style={{ bottom: '5px', right: '5px' }}>
        <ArrowUpwardIcon
          color="secondary"
          style={{
            fontSize: 45,
            borderRadius: '50%',
            backgroundColor: 'pink',
            opacity: 0.7
          }}
        />
      </ScrollToTop>
    </Hidden>
  );
}

export default ScrollUpButton;
