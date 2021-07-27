import Highchart from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { themeColor } from '../../utils/constants';
LineChart.propTypes = {};

const generateOptions = (data, darkMode) => {
  return {
    chart: {
      height: 400,
      type: 'area',
      backgroundColor: darkMode ? themeColor.gray : themeColor.light
    },
    title: {
      text: null
    },
    xAxis: {
      categories: data?.cases && Object.keys(data?.cases),
      crosshair: true
    },
    colors: ['#cb2b83', '#164c7e', '#49aa19'],
    yAxis: {
      min: 0,
      title: {
        text: null
      }
      //   labels: {
      //     align: "right",
      //   },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        `<tr><td style="color:{series.color};padding:0">{series.name}:</td>` +
        `<td style="padding:0"><b>{point.y} ca</b></td></tr>`,
      footerFormat: '</table>',
      shared: 'true',
      useHTML: 'true'
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [
      {
        name: 'Cases',
        data: data?.cases && Object.values(data?.cases)
      },
      {
        name: 'Deaths',
        data: data?.cases && Object.values(data?.deaths)
      },
      {
        name: 'Recovered',
        data: data?.cases && Object.values(data?.recovered)
      }
    ]
  };
};

function LineChart(props) {
  const { report } = props;
  const darkMode = useSelector((state) => state.GlobalReducer.darkTheme);
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(report, darkMode));
  }, [report, darkMode]);

  return (
    <div>
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  );
}

export default LineChart;
