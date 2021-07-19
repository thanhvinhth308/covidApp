import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
CircleChart.propTypes = {};

const generateOptions = (data) => {
  return {
    chart: {
      height: 400,

      type: 'pie',
    },
    title: {
      text: null,
    },
    // tooltip: {
    //   pointFormat: '<b>{point.percentage:.1f}%</b>',
    // },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    size: '150%',
    // plotOptions: {
    //   pie: {
    //     allowPointSelect: true,
    //     cursor: 'pointer',
    //     dataLabels: {
    //       enabled: true,
    //       format: '<b>{point.name}</b>: {point.percentage:.1f} %',
    //       connectorColor: 'silver',
    //     },
    //   },
    // },
    colors: ['#c9302c', 'gray', '#28a745'],
    series: [
      {
        data: [
          {
            name: 'Số ca nhiễm',
            y: _.sum(data.cases && Object.values(data.cases)),
          },
          {
            name: 'Số ca chết',
            y: _.sum(data.cases && Object.values(data.deaths)),
          },
          {
            name: 'Số ca khỏi',
            y: _.sum(data.cases && Object.values(data.recovered)),
          },
        ],
      },
    ],
  };
};

function CircleChart(props) {
  const { report = [] } = props;
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(report));
  }, [report]);

  return <HighchartsReact highcharts={Highchart} options={options} />;
}

export default CircleChart;
