import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import React from 'react';
import ScrollToTop from 'react-scroll-up';
ScrollUpButton.propTypes = {};

function ScrollUpButton(props) {
  return (
    <ScrollToTop showUnder={50} style={{ bottom: '5px', right: '5px' }}>
      <ArrowUpwardIcon
        color="secondary"
        style={{
          fontSize: 45,
          borderRadius: '50%',
          backgroundColor: 'pink',
          opacity: 0.7,
        }}
      />
    </ScrollToTop>
  );
}

export default ScrollUpButton;
