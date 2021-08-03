import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { themeColor } from '../../utils/constants';
CircleChart.propTypes = {};

const generateOptions = (data, darkMode) => {
  return {
    chart: {
      height: 400,
      backgroundColor: darkMode ? themeColor.gray : themeColor.light,
      type: 'pie',
    },
    title: {
      text: null,
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    size: '150%',
    colors: ['#e0529c', '#177ddc', '#6abe39'],
    series: [
      {
        name: 'Total',
        data: [
          {
            name: 'Cases',
            y: data?.cases && Object.values(data?.cases).pop(),
          },
          {
            name: 'Deaths',
            y: data?.cases && Object.values(data?.deaths).pop(),
          },
          {
            name: 'Recovered',
            y: data?.cases && Object.values(data?.recovered).pop(),
          },
        ],
      },
    ],
  };
};

function CircleChart(props) {
  const { report } = props;
  const [options, setOptions] = useState({});
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);

  useEffect(() => {
    setOptions(generateOptions(report, darkMode));
  }, [report, darkMode]);

  return <HighchartsReact highcharts={Highchart} options={options} />;
}

export default CircleChart;
