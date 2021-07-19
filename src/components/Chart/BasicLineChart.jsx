import { Button, ButtonGroup } from '@material-ui/core';
import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
BasicLineChart.propTypes = {};

const generateOptions = (data) => {
  // const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 400,
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: data.cases && Object.keys(data.cases),
      crosshair: true,
    },
    colors: ['#c9302c', 'gray', '#28a745'],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        `<tr><td style="color:{series.color};padding:0">{series.name}:</td>` +
        `<td style="padding:0"><b>{point.y} ca</b></td></tr>`,
      footerFormat: '</table>',
      shared: 'true',
      useHTML: 'true',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Số ca nhiễm',
        data: data.cases && Object.values(data.cases),
      },
      {
        name: 'Số ca chết',
        data: data.deaths && Object.values(data.deaths),
      },
      {
        name: 'Số ca khỏi',
        data: data.recovered && Object.values(data.recovered),
      },
    ],
  };
};

function BasicLineChart(props) {
  const { report } = props;
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(report));
  }, [report]);
  return (
    <div>
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default BasicLineChart;
