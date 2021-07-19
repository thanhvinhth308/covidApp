import { Carousel, Image } from 'antd';
import React from 'react';
import covid1 from '../../../../assets/images/covid/covid1.jpg';
import covid2 from '../../../../assets/images/covid/covid2.jpg';
import covid3 from '../../../../assets/images/covid/covid3.jpg';
import covid4 from '../../../../assets/images/covid/covid4.jpg';
const contentStyle = {
  height: '400px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'black',
};
function ImgCarousel(props) {
  return (
    <Carousel autoplay width="100%">
      <div>
        <h3 style={contentStyle}>
          <Image width="70%" height="100%" src={covid1} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image width="70%" height="100%" src={covid2} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image width="70%" height="100%" src={covid3} />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <Image width="70%" height="100%" src={covid4} />
        </h3>
      </div>
    </Carousel>
  );
}

export default ImgCarousel;
