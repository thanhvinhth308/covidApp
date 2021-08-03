import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { themeColor } from '../../utils/constants';

const generateOptions = (data, darkMode) => {
  return {
    chart: {
      type: 'column',
      height: 400,
      backgroundColor: darkMode ? themeColor.gray : themeColor.light,
    },
    title: {
      text: null,
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    colors: ['#e0529c', '#177ddc', '#6abe39'],
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>',
    },
    series: [
      {
        name: 'Total',
        colorByPoint: true,
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
function AreaChart(props) {
  const { report } = props;
  const [options, setOptions] = useState({});
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);

  useEffect(() => {
    setOptions(generateOptions(report, darkMode));
  }, [report, darkMode]);

  return (
    <div>
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default AreaChart;
